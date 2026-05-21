CKEDITOR.config.toolbar_Full =
                [
                { name: 'document', items : [ 'Source'] },
                { name: 'clipboard', items : [ 'Cut','Copy','Paste','-','Undo','Redo' ] },
                { name: 'editing', items : [ 'Find'] },
                { name: 'basicstyles', items : [ 'Bold','Italic','Underline'] },
                { name: 'paragraph', items : [ 'JustifyLeft','JustifyCenter','JustifyRight'] }
                ];
            CKEDITOR.config.height = '40px';
            CKEDITOR.config.removePlugins = 'maximize';
            CKEDITOR.config.removePlugins = 'resize';
            CKEDITOR.config.sharedSpaces = { top: 'toolbar1'};
            CKEDITOR.replace('editor_question', {
                 extraPlugins: 'ckeditor_wiris',
                 language: 'en',
                 mathTypeParameters : {'editorParameters' : {'fontSize' : '26px'}}
            });
             CKEDITOR.replace('editor_answer', {
                 extraPlugins: 'ckeditor_wiris',
                 language: 'en',
                 mathTypeParameters : {'editorParameters' : {'toolbar' : 'quizzes'}}
             });
			 
			 CKEDITOR.replace('editor_answer1', {
                 extraPlugins: 'ckeditor_wiris',
                 language: 'en',
                 mathTypeParameters : {'editorParameters' : {'toolbar' : 'quizzes'}}
             });
			 
			 CKEDITOR.replace('editor_answer2', {
                 extraPlugins: 'ckeditor_wiris',
                 language: 'en',
                 mathTypeParameters : {'editorParameters' : {'toolbar' : 'quizzes'}}
             });
			 CKEDITOR.replace('editor_answer3', {
                 extraPlugins: 'ckeditor_wiris',
                 language: 'en',
                 mathTypeParameters : {'editorParameters' : {'toolbar' : 'quizzes'}}
             });
			  CKEDITOR.replace('editor_answer4', {
                 extraPlugins: 'ckeditor_wiris',
                 language: 'en',
                 mathTypeParameters : {'editorParameters' : {'toolbar' : 'quizzes'}}
             });
			 
			 CKEDITOR.replace('editor_answer5', {
                 extraPlugins: 'ckeditor_wiris',
                 language: 'en',
                 mathTypeParameters : {'editorParameters' : {'toolbar' : 'quizzes'}}
             });
			 
			 CKEDITOR.replace('editor_answer6', {
                 extraPlugins: 'ckeditor_wiris',
                 language: 'en',
                 mathTypeParameters : {'editorParameters' : {'toolbar' : 'quizzes'}}
             });
			 CKEDITOR.replace('editor_answer7', {
                 extraPlugins: 'ckeditor_wiris',
                 language: 'en',
                 mathTypeParameters : {'editorParameters' : {'toolbar' : 'quizzes'}}
             });