
function main(msg){
  //http request needs to block because main will return control to OpenWhisk
  //as soon as req.end() is called and callback on 'end' event will not be called.
  //Hence we use whiks.async() and whisk.done()
  var result = "";
  var watson = require('watson-developer-cloud');
  var personality_insights = watson.personality_insights({
    username: 'ba1e0e37-a2b8-4c60-b33b-4e9ad91cc699',
    password: 'z2Kb1MfB6Tqr',
    version: 'v2'
  });

  var params = {
    text: msg.text,
    language: (msg.language || "en"),
    contentType: "text/plain; charset=utf-8"
  };

  personality_insights.profile(params, function(error, response) {
      if (error){
        console.log('Watson Personality Insights error: ', error);
        result = error;
      } else {
        result = response;
      };
      whisk.done({ analysis: result })
    }
  );

  return whisk.async();
}
