var codeArea = document.getElementById('codeArea');
var outputArea = document.getElementById('outputArea');
var button = document.getElementById('button');
var option = document.getElementById('dropdown');

codeArea.addEventListener('keydown',function(e)
{
    if(e.key == 'Tab')
    {
        e.preventDefault();
        var start = this.selectionStart;
        var end = this.selectionEnd;

        console.log(start,end);
        this.value = this.value.substring(0,start) + "\t" + this.value.substring(end);

        this.selectionStart = this.selectionEnd = start+1;
    }
})

codeArea.focus();

button.addEventListener('click',function()
{
    if(option.value == "default")
    {
        alert("Select a language");
    }
    else
    {
        executeCode();
    }
})

function executeCode()
{
    button.disabled;
    button.innerText = "Loading...";

    var myCode = codeArea.value;
    var lang = option.value;
    var input_value = prompt("Enter the Input");

    var my_data = JSON.stringify({
        code:myCode,
        language:lang,
        input:input_value
    });


    var req = new XMLHttpRequest();
    req.open("POST","/data");
    req.setRequestHeader("Content-type","application/json");
    req.send(my_data);

    setTimeout(function(){

        var req2 = new XMLHttpRequest();
        req2.open("GET","/output");
        req2.setRequestHeader("Content-type","application/json");
        req2.send();

        req2.addEventListener('load',function(event)
        {        
                console.log("From req2");
                console.log(req2.responseText);
                outputArea.innerText = req2.responseText;
                button.enabled;
                button.innerText = "Compile";
        });
    },5000);   
}