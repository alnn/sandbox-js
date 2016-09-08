const InstantComment = (() => {
    console.log('waiting for post...');

    let message = 'Hello World',
        ic,
        watch = true;

    const init = () => {
        Notifier.addFeed = function (queue, data) {
            var addq = curNotifier.addQueues[queue];
            if (!isArray(addq) || !addq.length) return;

            addq[1] = data.ts;
            if (isFunction(addq[3])) {
                addq[3](queue, data);
            }

            data.events.forEach(item => {
                if (watch && /new_post/.test(item)) {
                    let postID = item.split('<!>')[2];
                    addComment(postID);
                }
            });
        };
    };

    const addComment = (postID) => {
        let replyID = postID.split('_');

        replyID = `${replyID[0]}_${++replyID[1]}`;

        Wall.showEditReply(postID, event);
        document.getElementById(`reply_field${postID}`).innerText = '1';
        wall.sendReply(postID, event, {});
        console.log(`Place for comment to the post ${postID} has been initiated`);
        ic = 0;
        while (ic < 10) {
            setTimeout(() => {(new Sound('mp3/bb3')).play();}, ic*2*100);
            ic++;
        }

        // Emulate real user actions
        setTimeout(() => {
            wall.editPost(document.getElementById(`reply_edit${replyID}`), replyID);
            setTimeout(() => {
                document.getElementById('wpe_text').innerText = message;
                WallEdit.savePost();
            }, 1000);
        }, 5000);

    };

    init();

    return {
        setMessage: (m) => message = m,
        stop: () => watch = false,
        watch: () => watch = true,
    };

})();
