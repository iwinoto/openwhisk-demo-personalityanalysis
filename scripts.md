* Create analyse-java action
  '''bash
  wsk action create analyse-java serverless/action_analyse.js
  ```

* Test analyse-java action
  ```bash
  wsk action invoke -p text "this is some text to analyse" -p language en -b -r analyse-java
  ```

* List cloundant binding in packages
  ```bash
  wsk package list
  ```

* List trigger on the speeches database
  ```bash
  wsk trigger list
  ```
* Get Cloudant trigger details
  ```bash
  wsk trigger get changedSpeech
  ```
* Create the `speechListener` action which will fire the `newSpeech` trigger
  ```bash
  wsk action create speechListener serverless/feed_newDoc.js
  ```
* Create the `newSpeech` trigger which is fed from the speechListener action.
  ```bash
  wsk trigger create newSpeech --feed speechListener
  ```
* Create a rule that invokes the `analyse-java` action when the `newSpeech` trigger is fired
  ```bash
  wsk rule create --enable newSpeechRule newSpeech analyse-java
  ```
* Test the rule by firing the trigger from the command line
  ```bash
  $ wsk trigger fire newSpeech -p text "some text" -p language en
  ```
or from the editor
  ```bash
  wsk trigger fire newSpeech -p text "here is some text to analyse" -p language en
  ```
* Inspect the result in the dashboard or list activations and get the activation result
* Create a rule that invokes the `speechListener` action when the `changedSpeech` trigger is fired
  ```bash
  wsk rule create --enable changedSpeechRule changedSpeech speechListener
  ```
* Test the rule by firing the trigger from the command line
  ```bash
  wsk trigger fire changedSpeech -p text "here is some text to analyse" -p language en
  ```
* Inspect the result in the dashboard or list activations and get the activation result
* Add a document to the database and look in the dashboard for new log entry.
