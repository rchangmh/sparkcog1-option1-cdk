# sparkcognition Option 1 CDK

AWS infrastructure provisioned for Option 1 of the challenge is created using AWS CDK. To deploy:

1. Have CDK v2 installed (`npm install -g aws-cdk`) and ensure target account is [bootstrapped](https://docs.aws.amazon.com/cdk/v2/guide/getting_started.html).
2. Change account details and region in `bin\sparkcog-option1-cdk.ts`.
3. Run:
   ```bash
   npm install
   npm run build
   cdk deploy --profile <profile_name>
   ```
