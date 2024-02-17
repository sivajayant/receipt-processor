Hi There, 
Please find the receipt processor working video in the lik below
working video: https://drive.google.com/file/d/1uZcwDjQVF3tQLcs4GN-vF85cHSxMXxVH/view?usp=sharing

Design/concept:
- UI is very basic, its just a select option allows users to pick a receipt they would like to upload. once the upload is done, they get to look at the points for the uploaded receipt.
- Backend: we have two routes as asked, one to uplaod and other to calculate the points.
- Database(file systems): Idea is to generate an unique id for each upload and write the body to a file. On calculate points, we just read the file with the ID passed in.

Code walkthrough:
- UI:
    - select is populate with hardcoded receipt names and values attached
    - upload button is disabled unless we select a receipt from the dropdowm
    - get points button is not shown until we uplaod a receipt
    - after get points, all the selections are cleared and the state is reset.
 
- Backend:
    - route: POST receipts/process
      - takes in a body, generates a UUID, writes it to a file and if success - sends a 200 along with ID to UI.
    - route: GET receipts/{id}/points
      - takes in a UUID as request parameters, reads the file we saved in receipts/process route and cacluates the points accrodingly, on success - returns points.

this module has two parts:
1. frontend: receipt-processor
    - built with react
    - need to install node
    - commands to run(after node is installed):
        - npm install
        - npm run dev  
3. backened: receipt-processor-api
    - build with node
    - commands to run:
        - npm install
        - npm run start  
