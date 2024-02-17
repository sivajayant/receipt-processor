Hi There, 
Please find the receipt processor working video in the link below
working video: https://drive.google.com/file/d/1uZcwDjQVF3tQLcs4GN-vF85cHSxMXxVH/view?usp=sharing

Design/concept:
- The UI is very basic, it's just a select option that allows users to pick a receipt they would like to upload. once the upload is done, they get to look at the points for the uploaded receipt.
- Backend: we have two routes as asked, one to upload and the other to calculate the points.
- Database(file systems): The idea is to generate a unique ID for each upload and write the body to a file. On calculating points, we just read the file with the ID passed in.

Code walkthrough:
- UI:
    - select is populated with hardcoded receipt names and values attached
    - The upload button is disabled unless we select a receipt from the dropdown
    - The get points button is not shown until we upload a receipt
    - after getting points, all the selections are cleared and the state is reset.
 
- Backend:
    - route: POST receipts/process
      - takes in a body, generates a UUID, writes it to a file, and if successful - sends a 200 along with ID to UI.
    - route: GET receipts/{id}/points
      - takes in a UUID as request parameters, reads the file we saved in receipts/process route, and calculates the points accordingly, on success - returns points.

this module has two parts:
1. frontend: receipt-processor
    - built with react
    - need to install node
    - commands to run(after node is installed):
        - npm install
        - npm run dev  
3. backend: receipt-processor-api
    - build with node
    - commands to run:
        - npm install
        - npm run start  
