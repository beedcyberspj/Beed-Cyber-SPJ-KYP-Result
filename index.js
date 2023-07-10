function checkResult() {
      var learnerCode = document.getElementById('studentName').value;
      var input = learnerCode.toUpperCase();
      var output = document.getElementById('output');

      // Replace 'studentName.csv' with the path or URL of your CSV file
      var csvFile = 'studentName.csv';

      Papa.parse(csvFile, {
        download: true,
        header: true,
        complete: function (results) {
          var parsedData = results.data;
          var definition = parsedData.find(function (student) {
            // Replace 'Learner Code' with the column name that contains the learner codes
            return (
              student &&
              student['Learner Code'] &&
              student['Learner Code'].toUpperCase() === input
            );
          });

          if (definition === undefined) {
            output.innerHTML =
              '<hr>There is no information about this learner.<hr>';
          } else {
            var bsCitScore = parseFloat(definition['BS-CIT']) || 0;
            var bsClsScore = parseFloat(definition['BS-CLS']) || 0;
            var bsCssScore = parseFloat(definition['BS-CSS']) || 0;
            var totalScore = bsCitScore + bsClsScore + bsCssScore;
            var bsCitPercentage = (bsCitScore / 100) * 100;
            var bsClsPercentage = (bsClsScore / 100) * 100;
            var bsCssPercentage = (bsCssScore / 100) * 100;
            var totalPercentage = (totalScore / 300) * 100;

            output.innerHTML =
              '<hr>Name: <span class="blinking-text">' +
              definition['Name'] +
              '</span><hr>Result: ' +
              definition['Result'] +
              '<hr>BS-CIT Score: ' +
              bsCitScore +
              ' out of 100 (' +
              bsCitPercentage.toFixed(2) +
              '%)<hr>BS-CLS Score: ' +
              bsClsScore +
              ' out of 100 (' +
              bsClsPercentage.toFixed(2) +
              '%)<hr>BS-CSS Score: ' +
              bsCssScore +
              ' out of 100 (' +
              bsCssPercentage.toFixed(2) +
              '%)<hr>Total Score: ' +
              totalScore +
              ' out of 300 (' +
              totalPercentage.toFixed(2) +
              '%)<hr>Thanks for connecting with Beed Cyber Infotech KYP Center<hr>';

            // Create the downloadButton dynamically
            var downloadButton = document.createElement('input');
            downloadButton.setAttribute('type', 'button');
            downloadButton.setAttribute('id', 'downloadButton');
            downloadButton.setAttribute('value', 'Download PDF');
            downloadButton.setAttribute('onclick', 'downloadResult()');
            output.appendChild(downloadButton);
          }
        },
      });
    }
function downloadResult() {
  var outputResult = document.getElementById('output').innerHTML;

  // Convert the download button to an image
  var downloadButton = document.getElementById('downloadButton');
  if (downloadButton) {
    var buttonImage = new Image();
    buttonImage.src =
      'data:image/svg+xml;base64,' +
      window.btoa(downloadButton.outerHTML);

    // Replace the download button element with the button image in the output HTML
    outputResult = outputResult.replace(
      downloadButton.outerHTML,
      buttonImage.outerHTML
    );
  }

  // Create a container element for the output HTML and disclaimer
  var container = document.createElement('div');

  // Add the image to the container
  var image = new Image();
  image.src = 'Images/image.jpeg'; // Replace with the correct image path
  image.style.display = 'block';
  image.style.margin = '20px auto'; // Set the margin using CSS syntax
  image.style.width = '200px'; // Set the width of the image
  image.style.height = 'auto'; // Let the height adjust automatically based on the width
  container.appendChild(image);

  // Add the heading to the container
  var heading = document.createElement('h1');
  heading.innerText = 'KYP Final Exam Result';
  heading.style.textAlign = 'center';
  container.appendChild(heading);

  // Add the output HTML to the container
  var output = document.createElement('div');
  output.innerHTML = outputResult;
  container.appendChild(output);

  // Add the disclaimer as a separate element at the bottom of the container
  var disclaimer = document.createElement('p');
  disclaimer.innerHTML =
    "<strong>DISCLAIMER:</strong> Although every effort has been made to ensure the accuracy of the information, <strong>Beed Cyber Infotech</strong> is not responsible for any inadvertent error that may have crept in the data being published online. The data published herewith is valid only for online verification of the statement of marks.";
  disclaimer.style.fontWeight = 'bold'; // Set font weight to bold
  disclaimer.style.color = 'red'; // Set text color to red
  container.appendChild(disclaimer);

  var note = document.createElement('p');
  note.innerHTML = '<strong>Note:</strong> For more details, contact your center.';
  note.style.fontStyle = 'italic'; // Set font style to italic
  container.appendChild(note);

  // Apply CSS styles to the container for background color and borders
  container.style.backgroundColor = '#f2f2f2';
  container.style.border = '1px solid black';

  // Convert the container HTML to PDF
  var opt = {
    margin: [12, 12, 12, 12],
    filename: 'result.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 6 },
    jsPDF: { format: 'a4', orientation: 'portrait' },
  };

  html2pdf().set(opt).from(container).save();
}




