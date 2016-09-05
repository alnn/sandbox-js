const InstantComment = (() => {
    console.log('waiting for post...');

    let message = 'Hello World';

    const init = () => {
        Notifier.addFeed = function (queue, data) {
            var addq = curNotifier.addQueues[queue];
            if (!isArray(addq) || !addq.length) return;

            addq[1] = data.ts;
            if (isFunction(addq[3])) {
                addq[3](queue, data);
            }

            data.events.forEach(item => {
                if (/new_post/.test(item)) {
                    let postID = item.split('<!>')[2];
                    addComment(postID);
                }
            });
        };
    };

    const addComment = (postID) => {
        Wall.showEditReply(postID, event);
        document.getElementById('reply_field' + postID).innerText = message;
        wall.sendReply(postID, event, {});
        console.log('Comment "' + message + '" added to the post ' + postID);
    };

    init();

    return {
        setMessage: (m) => message = m
    };

})();
