## BMX Dedicated IBM staging admin console walk through
  * DevOps concerned about maverick service instantiation, show catalogue management and organisation utilisation.

## Demo application build and resilience with Java (WS Liberty) and Personality Insight using boilerplate
  1. get code from boiler plate - **Java->Watson Personality Insights**
  * create github repo and deploy pipeline (new toolchain?)
  * add kill me button
  * add instance display
  * commit code and show pipeline
    - talk about other tools, eg Jenkins
  * kill an instance
    * talk about platform resilience
    * show instance restart
  * add auto scale service
    * as app restages talk about platform auto configuring routing

## Stress testing the app with Apache Benchmark
* Config auto scale service
  * min instances 2
  * Response time
    * Upper threshold: 10ms
    * Lower threshold: 5ms
  * all timers and windows to minimum (30 sec in US)
* test with:
  * Post profile request for greater workload stress.
    * After stressing with a series of POSTs, send some GETs to reclaim memory:

    ```bash
    $ ab -n 1000 -c 15 -s 60 -r -p sampleText/urlencoded.txt -T application/x-www-form-urlencoded https://iw-personalityinsights-demo.mybluemix.net/demo
    ```
  * Get page:
    * After stressing with a series of POSTs, send some GETs to reclaim memory and show scale down:

    ```bash
    $ ab -n 1000 -c 15 -s 60 -r http://iw-personalityinsights-demo.mybluemix.net/
    ```

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
