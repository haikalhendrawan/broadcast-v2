        // get the form element
        const form = document.querySelector('form');

        // add event listener to the form submit event
        form.addEventListener('submit', event => {
            // get the message element
            const message = document.querySelector('#summernote');

            // strip HTML tags from the message value
            message.value = message.value.replace(/<\/?([a-z][a-z0-9]*)\b[^>]*>?/gi, '');

            // submit the form
            form.submit();
        });