if(window.File && window.FileReader && window.FileList && window.Blob){
    //////
    inputFiles.addEventListener('change', handlerFileSelect);
    inputFiles.addEventListener('change', handlePartFileOuter);
    
    abortBtn.disabled = "disabled";
    
    function updateProgress (evt) {
        if(evt.lengthComputable) {
            abortBtn.style.display = 'block';
            let percent = Math.round((evt.loaded / evt.total) * 100);

            if(percent < 100) {
                progress.style.width = percent + '%';
                progress.textContent = percent + '%';
            }
        }
    }

    function handlerFileSelect(evt) {
        let reader = new FileReader();
        reader.readAsBinaryString(evt.target.files[0]);

        progress.style.width = '0%';
        progress.style.backgroundColor = '#ffaa22';
        progress.textContent = '0%';
        abortBtn.disabled = '';

        reader.onprogress = updateProgress;

        reader.onload = function () {
            progress.style.width = '100%';
            progress.textContent = 'Loading Complete!';
            progress.style.backgroundColor = '#3aff00';

            if(!abortBtn.disabled) {
                abortBtn.disabled = "disabled";
            }
        };

        function abortHandler() {
            reader.abort();
            progress.style.width = '100%';
            progress.textContent = 'Download canceled';
            progress.style.backgroundColor = '#ff3e3e';
            abortBtn.disabled = "disabled";
        }

        abortBtn.addEventListener('click', abortHandler);
    }
    function handlePartFileOuter(evt) {
        let file = evt.target.files[0];

        let reader = new FileReader();
        reader.onprogress = function (e) {
            loadedContent.innerHTML += e.target.result;
        };
        reader.readAsBinaryString(file);
    }
}
else console.error('The File APIs are not fully supported in this browser.');
