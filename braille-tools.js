/* 
  Braille-Tools
  (c) 2016 Olivier Giulieri
  https://github.com/evoluteur/braille-tools 
*/

var br = {
    braille: function (message) { 
        var txt=''; 
        var myChar, prevCharNum, inQuote 

        function BrailleChar(bPix, bAlt) {
            return '<div class="br br-'+bPix+'" title="'+bAlt+'"></div>'
        }

        for (var i=0; i<message.length; i++) {
            myChar = message.charAt(i);
            if ((myChar>="a") && (myChar<="z")) { // a to z
                    txt+=BrailleChar(myChar, myChar);
                    prevCharNum = false;            
            } else if((myChar>="A") && (myChar<="Z")) { // A to Z
                    txt+=BrailleChar("cap", "Caps")+BrailleChar(myChar, myChar);
                    prevCharNum = false;         
            } else if((myChar>"0") && (myChar<="9")) {
                    if (!prevCharNum){
                            txt+=BrailleChar("num", "Number");
                    } 
                    txt+=BrailleChar(String.fromCharCode(myChar.charCodeAt(0) + 48), myChar); 
                    prevCharNum = true;            
            } else {
                switch (myChar) {
                    case " ": 
                        txt+=BrailleChar("sp", "Space");
                        prevCharNum = false;
                        break;
                    case "0":
                        if (!prevCharNum){
                            txt+=BrailleChar("num", "Number"); 
                        }
                        txt+=BrailleChar("j", "0");      
                        prevCharNum = true;
                        break;
                    case "\n":
                        txt+="<br><br>";
                        nbCharsInLine = -1;
                        prevCharNum = false;
                        break;
                    case ".":
                        if (prevCharNum){
                            txt+=BrailleChar("dec", "."); 
                        }
                        else{
                            txt+=BrailleChar("period", ".");  
                        }
                        break;
                    case "$":
                        txt+=BrailleChar("period", "$");
                        prevCharNum = false;
                        break;
                    case "%":
                        txt+=BrailleChar("col", "%")+BrailleChar("p", "");
                        prevCharNum = false;
                        break;
                    case "'":
                        txt+=BrailleChar("qs", "'"); 
                        prevCharNum = false;
                        break;
                    case ",":
                        txt+=BrailleChar("comma", ",");
                        prevCharNum = false;
                        break;
                    case "?":
                        txt+=BrailleChar("qu", "?"); 
                        prevCharNum = false;
                        break;
                    case "(":
                    case ")":
                        txt+=BrailleChar("par", "parenthesis"); 
                        prevCharNum = false;
                        break;
                    case "*":
                        txt+=BrailleChar("ast", "*")+BrailleChar("ast", "*"); 
                        prevCharNum = false;
                        break;
                    case "//":
                        txt+=BrailleChar("sla", "//"); 
                        prevCharNum = false;
                        break;
                    case "!":
                        txt+=BrailleChar("ex", "!"); 
                        prevCharNum = false;
                        break;
                    case "'": 
                        if (inQuote)
                            txt+=BrailleChar("qc", "Close Quote"); 
                        else
                            txt+=BrailleChar("qo", "Open Quote");  
                        inQuote = !inQuote;
                        prevCharNum = false;
                        break;
                    case ":":
                        txt+=BrailleChar("col", ":");
                        prevCharNum = false;
                        break;
                    case ";":
                        txt+=BrailleChar("sc", ";"); 
                        prevCharNum = false;
                        break;
                    case "[":
                        txt+=BrailleChar("cap", "[")+BrailleChar("par", "");
                        break;
                    case "]":
                        txt+=BrailleChar("par", "]")+BrailleChar("qs", ""); 
                        break;
                }
            }
        }
        return txt;
    },

    alphabet: function(){
        var alpha='<div class="braille-doc2 alphabet">',
            char;
        for(var i=97;i<123;i++){
            char=String.fromCharCode(i);
            alpha+='<div><span>'+char+'</span><div class="br br-'+char+'"></div></div>'; 
        }
        return alpha+'</div>';
    }
}
