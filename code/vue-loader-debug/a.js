while (queueConnect.size > 0) {
    // Figure out new parents for chunk groups
    // to get new available modules for these children

    // chunkGroup: 父，targets： 子
    for (const [chunkGroup, targets] of queueConnect) {
        const info = chunkGroupInfoMap.get(chunkGroup);
        let minAvailableModules = info.minAvailableModules;

        // 1. Create a new Set of available modules at this points
        // 先收集父chunkGroup中所有的chunks中的所有模块
        const resultingAvailableModules = new Set(minAvailableModules);
        for (const chunk of chunkGroup.chunks) {
            for (const m of chunk.modulesIterable) {
                resultingAvailableModules.add(m);
            }
        }

        // 通过children建立父子联系，这里并不是真正的建立chunkGroup的父子关系
        // 具体的作用，后面补充，❓ 后面为什么要重新设置到queuecConnect
        info.resultingAvailableModules = resultingAvailableModules;
        if (info.children === undefined) {
            info.children = targets;
        } else {
            for (const target of targets) {
                info.children.add(target);
            }
        }

        // 2. Update chunk group info
        // 1. 给新chunkGroup（也有可能是复用之前创建的，同名的chunkGroup只会创建一个, 
        // 如 import(/* webpackChunkName: "B" */'./B') 可以指定chunkName，也是chunkGroup.name）
        // 创建chunkGroupInfo，
        // 2. 保存父chunkGroup中的所有module：resultingAvailableModules - 集合
        for (const target of targets) {
            let chunkGroupInfo = chunkGroupInfoMap.get(target);
            if (chunkGroupInfo === undefined) {
                chunkGroupInfo = {
                    chunkGroup: target,
                    minAvailableModules: undefined,
                    minAvailableModulesOwned: undefined,
                    availableModulesToBeMerged: [],
                    skippedItems: [],
                    resultingAvailableModules: undefined,
                    children: undefined,
                };
                chunkGroupInfoMap.set(target, chunkGroupInfo);
            }
            chunkGroupInfo.availableModulesToBeMerged.push( // 每一个chunkGroup都会push一次，
                resultingAvailableModules,
            );
            outdatedChunkGroupInfo.add(chunkGroupInfo); // 临时存储每个子chunkGroupInfo
        }
    }
    queueConnect.clear(); // 本身只是为了计算异步chunkGroup的 minAvailableModules，计算完后可以清理了。


    // 下面for训话的逻辑就是计算多个集合的交集
    if (outdatedChunkGroupInfo.size > 0) {        
        // Execute the merge
        for (const info of outdatedChunkGroupInfo) { // 每个子chunkGroup都会计算 minAvailableModules
            const availableModulesToBeMerged = info.availableModulesToBeMerged;
            let cachedMinAvailableModules = info.minAvailableModules;

            // 1. Get minimal available modules
            // It doesn't make sense to traverse a chunk again with more available modules.
            // This step calculates the minimal available modules and skips traversal when
            // the list didn't shrink.
            
            // 1. 当有多个 resultingAvailableModules，初始值当然是数量最小的那个（因为更多的多出那一部分显然不是公共模块）
            // 2. 多个集合的合并，貌似合理的做法是从小到大两两合并，❓
            if (availableModulesToBeMerged.length > 1) {
                availableModulesToBeMerged.sort(bySetSize);
            }
            let changed = false; //  关键：用来判断 minAvailableModules 是否发生了变化

            // 下面整段for循环为了计算 minAvailableModules，
            // 即多个集合（availableModulesToBeMerged and  minAvailableModules）的交集
            for (const availableModules of availableModulesToBeMerged) {
                if (cachedMinAvailableModules === undefined) { // 第一次初始化
                    cachedMinAvailableModules = availableModules;
                    info.minAvailableModules = cachedMinAvailableModules;
                    info.minAvailableModulesOwned = false;
                    changed = true;
                } else {
                    if (info.minAvailableModulesOwned) { // 如果曾经计算过交集，则后面交集的计算逻辑在这里，为什么这么做❓❓❓
                        // We own it and can modify it
                        for (const m of cachedMinAvailableModules) { // 为什么❓，感觉和下面else逻辑冲突了？
                            if (!availableModules.has(m)) {
                                cachedMinAvailableModules.delete(m);
                                changed = true;
                            }
                        }
                    } else {                    
                        for (const m of cachedMinAvailableModules) { // 这里是遍历[迭代器]
                            
                            // availableModules是父chunkGroup中的所有module的集合，直到有一个不在此次父availableModules中（即不在交集内，需要剔除），
                            // 说明需要重新计算交集即下面if: 计算 availableModules & cachedMinAvailableModules 的交集
                            if (!availableModules.has(m)) {
                                // cachedMinAvailableModules need to be modified
                                // but we don't own it
                                // construct a new Set as intersection of cachedMinAvailableModules and availableModules
                                /** @type {Set<Module>} */
                                const newSet = new Set();
                                const iterator = cachedMinAvailableModules[  // 关键: 重新获取新的迭代器，重新遍历
                                    Symbol.iterator
                                ]();
                                /** @type {IteratorResult<Module>} */
                                let it;
                                while (!(it = iterator.next()).done) {
                                    const module = it.value;
                                    if (module === m) break; // 所有相等的模块都是交集内的，直到那个不相等的
                                    newSet.add(module);
                                }
                                while (!(it = iterator.next()).done) {
                                    const module = it.value;
                                    // 如果 cachedMinAvailableModules中的模块也在availableModules中，就是交集内的
                                    if (availableModules.has(module)) { 
                                        newSet.add(module);
                                    }
                                }
                                cachedMinAvailableModules = newSet;
                                info.minAvailableModulesOwned = true; // 含义是❓，表示计算过交集??
                                info.minAvailableModules = newSet;

                                // Update the cache from the first queue
                                // if the chunkGroup is currently cached
                                // 注意这里的chunkGroup的作用域，是visitModules函数内有效的
                                // 因为 if (chunkGroup !== queueItem.chunkGroup) 在，这里需要手动更新 minAvailableModules
                                if (chunkGroup === info.chunkGroup) { 
                                    minAvailableModules = cachedMinAvailableModules;
                                }

                                changed = true;
                                break; // 关键，只要发现一个不包含，计算完成后，直接退出
                            }
                        }
                    }
                }
            }
        
            availableModulesToBeMerged.length = 0;
            // 如果 minAvailableModules 没有发生变化，
            // 说明新的异步引用没有让减少子chunkGroup的可使用模块，则不需要重新计算 skippedItems
            if (!changed) continue;
            
            // 2. Reconsider skipped items
            // skippedItems 表示上面计算依赖链的时候跳过的模块，但是因为minAvailableModules会发生变化，有些模块就不应该被跳过了            
            // 如果 minAvailableModules 变化（因为是求交集，只可能减少），则需要重新计算skippedItems
            // 比如之前 skippedItems: [a,b,c] , minAvailableModules: [a,b,c,d,e]，现在minAvailableModules变为了：[a, b] （说明新的异步引用的父chunkGroup没有使用c,d,e模块）
            // skippedItems 加入到queue中，重新计算是否需要跳过，如果可以跳过则继续跳过，比如这里的a,b，如果不能跳过，说明子chunkGroup.chunk需要依赖他即需要建立链接-ADD_AND_ENTER_MODULE（没有任何父chunkGroup提供该模块用来共享）
            // 当前这个阶段，chunkGroup只会包含一个chunk中，发生在compilation.seal和上面的 iteratorBlock
            // buildChunkGraph阶段完成后，在compilation.seal 的后面逻辑会有很多chunks相关的钩子已进行优化，此时有可能构成一对多的关系。
            for (const queueItem of info.skippedItems) {
                queue.push(queueItem); // 总结：minAvailableModules收缩的情况，skippedItems需要重新判断是继续跳过还是加入链接。
            }
            info.skippedItems.length = 0;

            // 3. Reconsider children chunk groups ❓❓❓
            if (info.children !== undefined) {
                const chunkGroup = info.chunkGroup;
                for (const c of info.children) {
                    let connectList = queueConnect.get(chunkGroup);
                    if (connectList === undefined) {
                        connectList = new Set();
                        queueConnect.set(chunkGroup, connectList);
                    }
                    connectList.add(c);
                }
            }
        }
        outdatedChunkGroupInfo.clear();
    }
}