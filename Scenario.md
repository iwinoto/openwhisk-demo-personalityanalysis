# Demo OpenWhisk.
## Scenario
A political researcher is interested in analysing political speeches to understand the personality that is being projected by the politician.

The researcher has a NoSQL database where the speeches are being stored and wants to use Watson Personality Insights service from Bluemix to analyse the speech. As a researcher, there are limited funds for this work and infrastrucure cannot be purchased. Cloud is an obvious deployment target. However, the rate that speeches are added to the database is very low and the researcher does not want to pay for idle cloud resources. The analysis process should only run when a new speech is added.

## Solution
* CloudantNoSQL to store the speeches
* Watson Developer Cloud Personality Insights
* OpenWhisk to trigger events from Cloundant NoSQL and activate actions to analyse the speech.

## Implementation

### Prerequisites
* IBM Bluemix account. [Sign up](https://console.ng.bluemix.net/registration) for Bluemix, or use an existing account.
* IBM Bluemix OpenWhisk early access. [Sign up for Bluemix OpenWhisk](https://new-console.ng.bluemix.net/openwhisk).
* Install and configure the OpenWhisk command line interface [Set up CLI](https://new-console.ng.bluemix.net/openwhisk/cli).

### Bluemix console
As of writing (1 July 2016), the Bluemix UX team is trialling a new user experience. The web interface to OpenWhisk is only available through the new experience. These instructions assume you are using the new console experience. At the time of writing, the new user experience uses the sub-doamin of `new-console`.

### Create an instance of Personality Insights service
1. From the main navigation menu, select the [`Watson`](./images/nav-category-watson.png) category.

### Create a CloudantNoSQL instnace
1. create CloudantNoSQL DB
* Launch the CloudantNoSQL console and create a database called `speeches`.

### Create an OpenWhisk action to get Personality Insight from text
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
