/**
 * Midi Pedal Editor 
 Copyright (c) 2019  Michael Panagos

 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with this program.  If not, see https://www.gnu.org/licenses.
 */


//mode
$(".modeDial").knob({
    'angleOffset': -150,
    'angleArc': 300,
    'max': 40,
    'min': 1,
    "fgColor": blue,
    'release': function (v) {

        if (pedal == "echosystem") {
            sendCC(midiChannel, ccMessages.echosystem.modes[engine - 1], echosystem.modes[v - 1]);
            $('.modeLabel').text(echosystem.modesName[v - 1]);
            // $(".modeDial").knob({
            //     'format' : function (value) {
            //        return echosystem.modesName[v - 1];
            //     }
            //   });
            $('.unoLabel').text(echosystem.modeThing1[v - 1]);
            $('.dosLabel').text(echosystem.modeThing2[v - 1]);
            $('.modeDial').trigger(
                'configure', {
                    "max":40,
                    "fgColor": echosystem.modesColor[v - 1],
                    "inputColor": echosystem.modesColor[v - 1],
                }
            );
        } else if (pedal == "reverb") {
            
            sendCC(midiChannel, ccMessages.reverb.modes, reverb.modes[v - 1]);
            $('.modeLabel').text(reverb.modesName[v - 1]);
            $('.unoLabel').text(reverb.modeThing1[v - 1]);
            $('.dosLabel').text(reverb.modeThing2[v - 1]);
            $('.modeDial').trigger(
                'configure', {
                    "fgColor": reverb.modesColor[v - 1],
                    "inputColor": reverb.modesColor[v - 1],
                }
            );
        }
    }
});
//ratio
$(".ratioDial").knob({
    'angleOffset': -150,
    'angleArc': 300,
    'min':1,
    'max': 9,
    "fgColor": gray,
    'change': function (v) {
        // console.log(v);
        // var msg=null;
        //console.log(buttontype2);
        if (pedal == "echosystem" && buttontype2!=3) {
            //set name and message to sent

            $('.ratioLabel').text(echosystem.ratioNames[Math.round(v)-1]);
             msg=echosystem.ratiocc[Math.round(v)-1];
            sendCC(midiChannel, ccMessages.echosystem.ratio[engine - 1], msg);
        } else if (pedal == "reverb") {
            sendCC(midiChannel, ccMessages.reverb.ratio, Math.round(v));
        }else if(pedal == "echosystem" && buttontype2==3){
             
            sendCC(midiChannel, ccMessages.echosystem.ratio[engine - 1], Math.round(v));
        }
        saveRatio(Math.round(v));
    },
    'release': function (v) {
        //console.log(v);
        // var msg=null;
        //console.log(buttontype2);
        if (pedal == "echosystem" && buttontype2!=3) {
            //set name and message to sent
            $('.ratioLabel').text(echosystem.ratioNames[Math.round(v)-1]);
             msg=echosystem.ratiocc[Math.round(v)-1];
            sendCC(midiChannel, ccMessages.echosystem.ratio[engine - 1], msg);
        } else if (pedal == "reverb") {
            sendCC(midiChannel, ccMessages.reverb.ratio, Math.round(v));
        }else if(pedal == "echosystem" && buttontype2==3){
            sendCC(midiChannel, ccMessages.echosystem.ratio[engine - 1], Math.round(v));
        }
        saveRatio(Math.round(v));
    }
});
//mix
$(".mixDial").knob({
    'angleOffset': -150,
    'angleArc': 300,
    'max': 127,
    "fgColor": gray,
    'change': function (v) {
        if (pedal == "echosystem") {
           sendCC(midiChannel, ccMessages.echosystem.mix[engine - 1], Math.round(v));
        } else if (pedal == "reverb") {
           sendCC(midiChannel, ccMessages.reverb.mix, Math.round(v));
        }


    },
    'release': function (v) {
        if (pedal == "echosystem") {
            //set  message to sent
           sendCC(midiChannel, ccMessages.echosystem.mix[engine - 1], Math.round(v));
        } else if (pedal == "reverb") {
           sendCC(midiChannel, ccMessages.reverb.mix, Math.round(v));
        }


    }
});
//volume
$(".volDial").knob({
    'angleOffset': -150,
    'angleArc': 300,
    'max': 127,
    "fgColor": gray,
    'change': function (v) {
        //set  COLOR OF KNOB
        if (v >= 100) {
            $('.volDial').trigger(
                'configure', {
                    "fgColor": red,
                    "inputColor": red,
                }
            );
        } else {
            $('.volDial').trigger(
                'configure', {
                    "fgColor": gray,
                    "inputColor": gray
                }
            );
        }

        //set  message to sent
        if (pedal == "echosystem") {
           sendCC(midiChannel, ccMessages.echosystem.volume[engine - 1], Math.round(v));
        } else if (pedal == "reverb") {
           sendCC(midiChannel, ccMessages.reverb.volume, Math.round(v));
        }

    },
    'release': function (v) {
        //set  COLOR OF KNOB
        if (v >= 100) {
            $('.volDial').trigger(
                'configure', {
                    "fgColor": red,
                    "inputColor": red,
                }
            );
        } else {
            $('.volDial').trigger(
                'configure', {
                    "fgColor": gray,
                    "inputColor": gray
                }
            );
        }

            //set  message to sent
        if (pedal == "echosystem") {
           sendCC(midiChannel, ccMessages.echosystem.volume[engine - 1], Math.round(v));
        } else if (pedal == "reverb") {
           sendCC(midiChannel, ccMessages.reverb.volume, Math.round(v));
        }

    }
});
// feedback
$(".feedbackDial").knob({
    'angleOffset': -150,
    'angleArc': 300,
    'max': 127,
    "fgColor": gray,
    'change': function (v) {

        //set  message to sent
        if (pedal == "echosystem") {
           sendCC(midiChannel, ccMessages.echosystem.feedback[engine - 1], Math.round(v));
        } else if (pedal == "reverb") {
           sendCC(midiChannel, ccMessages.reverb.feedback, Math.round(v));
        }
    },
    'release': function (v) {


        if (pedal == "echosystem") {
           sendCC(midiChannel, ccMessages.echosystem.feedback[engine - 1], Math.round(v));
        } else if (pedal == "reverb") {
           sendCC(midiChannel, ccMessages.reverb.feedback, Math.round(v));
        }
    }
});
//tone
$(".toneDial").knob({
    'angleOffset': -150,
    'angleArc': 300,
    'max': 127,
    "fgColor": gray,
    'change': function (v) {
        //set  message to sent
        if (pedal == "echosystem") {
           sendCC(midiChannel, ccMessages.echosystem.tone[engine - 1], Math.round(v));
        } else if (pedal == "reverb") {
           sendCC(midiChannel, ccMessages.reverb.tone, Math.round(v));
        }
    },
    'release': function (v) {
        //set  message to sent
        if (pedal == "echosystem") {
           sendCC(midiChannel, ccMessages.echosystem.tone[engine - 1], Math.round(v));
        } else if (pedal == "reverb") {
           sendCC(midiChannel, ccMessages.reverb.tone, Math.round(v));
        }
    }
});
//thing 1
$(".unoDial").knob({
    'angleOffset': -150,
    'angleArc': 300,
    'max': 127,
    "fgColor": gray,
    'change': function (v) {
        //set  message to sent

        if (pedal == "echosystem") {
           sendCC(midiChannel, ccMessages.echosystem.uno[engine - 1], Math.round(v));
        } else if (pedal == "reverb") {
           sendCC(midiChannel, ccMessages.reverb.uno, Math.round(v));
        }
    },
    'release': function (v) {


        if (pedal == "echosystem") {
           sendCC(midiChannel, ccMessages.echosystem.uno[engine - 1], Math.round(v));
        } else if (pedal == "reverb") {
           sendCC(midiChannel, ccMessages.reverb.uno, Math.round(v));
        }
    }
});
// thing 2
$(".dosDial").knob({
    'angleOffset': -150,
    'angleArc': 300,
    'max': 127,
    "fgColor": gray,
    'change': function (v) {
        //set  message to sent
        if (pedal == "echosystem") {
           sendCC(midiChannel, ccMessages.echosystem.dos[engine - 1], Math.round(v));
        } else if (pedal == "reverb") {
           sendCC(midiChannel, ccMessages.reverb.dos, Math.round(v));
        }
    },
    'release': function (v) {
        if (pedal == "echosystem") {
           sendCC(midiChannel, ccMessages.echosystem.dos[engine - 1], Math.round(v));
        } else if (pedal == "reverb") {
           sendCC(midiChannel, ccMessages.reverb.dos, Math.round(v));
        }
    }
});