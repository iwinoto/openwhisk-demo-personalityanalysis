## Demo OpenWhisk.

Trigger an action through a DB update
  1. create CloudantNoSQL DB
  * Launch the CloudantNoSQL console and create a databse called `speeches`.
  * create whisk action to get Personality Insight from text
    1. create action
      ```bash
      $ wsk action create analyse-java serverless/action_analyse.js
      ```
    * test action
      ```bash
      $ wsk action invoke -p text "this is some text to analyse" -p language en -b -r analyse-java
      ```
  * Create a trigger when a new document is added to CloudantNoSQL
    1. get CloudantNoSQL credentials from Bluemix console. This automatically creates the package binding. Test that the binding exists
      1. Make sure your OpenWhisk CLI is in the namespace corresponding to the Bluemix organization and space where the CloudantNoSQL service instance is created.
        ```bash
        $ wsk property set --namespace <myBluemixOrg>_<myBluemixSpace>
        ```
      * Refresh the whisk packages in your namespace. The refresh automatically creates a package binding for the Cloudant service instance that you created.
        ```bash
        $ wsk package refresh

        $ wsk package list
        ```
        Should see the fully qualified name of the package binding corresponding to the CloudantNoSQL service instance
    * create trigger on the `speeches` database
      ```bash
      wsk trigger create changedSpeech --feed /iwinoto@au1.ibm.com_dev/Bluemix_Cloudant-speeches_Credentials-1/changes --param dbname speeches --param includeDoc true
      ```
