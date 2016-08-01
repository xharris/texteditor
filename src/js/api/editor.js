var b_editor;

$(function(){
    b_editor = {
        setFile: function(file_path) {
            //try {
                file_path = nwPATH.normalize(file_path);
                var stat = nwFILE.lstatSync(file_path);

                if (stat.isFile()) {
                    // add file to ide_data['recent_files']
                    var new_recent = nwPATH.basename(file_path);
                    b_search.removeSuggestion(file_path);
                    b_search.addSuggestion(file_path);

                    ide_data['curr_file'] = file_path;

                    saveData();

                    console.log('opening ' + file_path);
                    nwFILE.readFile(file_path, 'utf-8', function(err, data) {
                        if (!err) {
                            editor.setValue(data);
                            editor.clearSelection();
                        }
                    });
                }
                /*
            } catch (e) {

            }
            */
        },

        saveFile: function() {
            if (ide_data['curr_file'] === '') {
                try {
                    console.log('save ' + ide_data['curr_file'])
                    nwFILE.writeFileSync(
                        ide_data['curr_file'],
                        editor.getValue(),
                        {
                            flag: 'w+'
                        }
                    )
                } catch (e) {

                }
            }
        }
    }
});
