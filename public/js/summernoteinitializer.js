$(document).ready(function () {
    document.emojiButton ='fas fa-smile';
    document.emojiSource ='summernote/summernoteemoji/tam-emoji/img';
    $('#summernote').summernote({
     placeholder: 'Input Message Here',
    tabsize: 3,
    height: 500,
    toolbar: [
    ['font', ['bold', 'underline', 'clear', 'italic']],
    ['insert',['emoji']],
    ['para', ['ul', 'ol', 'paragraph']],
    ['table', ['table']],
    ['view', ['help']]
    ]
    });
    });