# Uploading Local Files to Google Drive without Authorization using HTML Form

This is a sample script for uploading local file to Google Drive without the authorization using HTML form. A selected file in your local PC using HTML form is uploaded to Google Drive and saved to Google Drive.

When you use this, at first, please [deploy Web Apps](https://developers.google.com/apps-script/guides/web#deploying_a_script_as_a_web_app). The script is ``doPost()`` of following scripts.

## Script : Google Apps Script
~~~javascript
function doPost(e) {
  var data = Utilities.base64Decode(e.parameters.data);
  var blob = Utilities.newBlob(data, e.parameters.mimetype, e.parameters.filename);
  DriveApp.createFile(blob);
  return ContentService.createTextOutput("Done.")
}
~~~

### Flow :
- Retrieve data, filename and mimetype as ``e.parameters.data``, ``e.parameters.filename`` and ``e.parameters.mimetype``, respectively.
- Decode the data using ``Utilities.base64Decode()``.
- Create blob using ``Utilities.newBlob()``.
- Create the file in the root folder of Google Drive.

## Script : HTML
``https://script.google.com/macros/s/#####/exec`` is the URL obtained when the Web Apps was deployed. Please replace it to your Web Apps URL. You can open this HTML for the browser of your local PC.

~~~html
<!DOCTYPE html>
<html>

<head>
    <title>Sample script for uploading file to Google Drive without authorization</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.js"></script>
</head>

<body>
    <form action="https://script.google.com/macros/s/#####/exec" id="form" method="post">
        Upload a file
        <div id="data"></div>
        <input name="file" id="uploadfile" type="file">
        <input id="submit" type="submit">
    </form>
    <script>
    $('#uploadfile').on("change", function() {
        var file = this.files[0];
        var fr = new FileReader();
        fr.fileName = file.name;
        fr.onload = function(e) {
            e.target.result
            html = '<input type="hidden" name="data" value="' + e.target.result.replace(/^.*,/, '') + '" >';
            html += '<input type="hidden" name="mimetype" value="' + e.target.result.match(/^.*(?=;)/)[0] + '" >';
            html += '<input type="hidden" name="filename" value="' + e.target.fileName + '" >';
            $("#data").empty().append(html);
        }
        fr.readAsDataURL(file);
    });
    </script>
</body>

</html>
~~~

### Flow :
- Using ``FileReader()``, retrieve base64 encoded file, filename and mimetype.
- Add input with type="hidden" to ``#form`` as text data.
    - ``replace(/^.*,/, '')`` is used for removing a header of encoded data.
    - ``match(/^.*(?=;)/)[0]`` is used for retrieving mimetype of uploading file.
- When a submit button is clicked, the base64 data is sent to ``doPost()`` of GAS.

## Note :
- In order to use this, after the script is modified, please redeploy Web Apps as a new version. By this, the latest script is reflected to Web Apps.
- This sample script can upload one file. If you want to upload several files, please modify script.  ``var file = this.files[0];`` means the selected first file. When there are some files, it is ``files[1], files[2] ....``.

## Reference :
- For downloading files on Google Drive to local PC, I have already published [here](https://gist.github.com/tanaikech/c5b2811bce01cbcc26ffa357df496379).
