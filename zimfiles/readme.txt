
TESTING ZIM 

What we would like to have is a way to test all ZIM classes, methods and functions after updating to a new ZIM.

There are unit tests and integration tests.  Here is a link that discusses the differences:
https://techbeacon.com/devops/6-best-practices-integration-testing-continuous-integration
Or there are any number of other google results.

I do the testing of each thing I add to or change in ZIM (similar to unit tests) 
but sometimes what I  might add or change will affect other code in ZIM.
And that is what is missing... I don't test all of ZIM to see if the changes break something else.
I have a pretty good idea as I am coding - but sometimes I don't catch a problem elsewhere.
So what we need is more along the lines of integration testing (CI - continuous integration).

For a while - back in ZIM DUO (2) - I think I made a big app that ran lots of code.
After many changes, I gave up updating it - and do not even know what file it was now.
There were many more changes during the early years but ZIM is starting to settle.
So recreating a test page or a set of test pages I think would make sense now.

In the ZIP there is a component, style and animation examples.  
These do not test all parameters but provide examples of what test pages might look like.

There are many parameters - what would be ideal is to use the ZIM code itself to create the test pages.
Or possibly the TypeScript typings base.txt which I need to update every version.
This has the data types in it which might allow us to automatically make sample arguments for the parameters.

In the ZIP are a few examples of parsing the docs (customize.html, live/index.php and distill/distill.js).
And typescript/parser/parser.html parses the base.txt - but just to duplicate it for the ZIM DUO technique.
So in the end... we would need the depth of parsing that we do on the docs - but do it on the typescript.
And the output would be a series of test HTML pages that we would run and view to make sure nothing is broken.

We can either use PHP to create the html pages or use JS to provide the html code as an output in a TextArea.
PHP would be able to create the files on the server so we could just use a menu page to run and view the tests.
That would be easier than manually created pages from javascript output - so PHP is prefered.

I think a test page per module might make sense - Display Objects, Methods, Controls, Code.
Although code is not really integrated so probably not needed.
There might be too much to look at with just three test pages - so sub test pages might be easier.
The modules are broken down into subtopics - see the -------- TOPIC dividers in https://zimjs.com/docs.html

Dan


 






