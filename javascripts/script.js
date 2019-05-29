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

var midi = null; // global MIDIAccess object
var cc = [0xB0, 0xB1, 0xB2, 0xB3, 0xB4, 0xB5, 0xB6, 0xB7, 0xB8, 0xB9, 0xBA, 0xBB, 0xBC, 0xBD, 0xBE, 0xBF]; //cc code for each midi channel
var pc = [0xC0, 0xC1, 0xC2, 0xC3, 0xC4, 0xC5, 0xC6, 0xC7, 0xC8, 0xC9, 0xCA, 0xCB, 0xCC, 0xCD, 0xCE, 0xCF]; // pc code for each midi channel
var preset = 0;
var midiChannel = 1;
var pedal = "echosystem";
var flag1 = 0;
var engaged = 1;
var flag2 = 0;
var engine = 1;
var backgroundColor=["#C0C0C0","#3E3A3A"]
var darkLight = 0;


var echosystem = {
    routing:1,
    name:"Echosystem",
    dails1: [20, 5, 64, 64, 64, 64, 64, 64],
    dails2: [20, 5, 64, 64, 64, 64, 64, 64],
    ratiocc: [10, 28, 42, 56, 72, 86, 98, 113, 127],
    ratioNames:["3:2","Eighth","2:3","Dotted Eighth","Quater","4:3","Dotted Quater","Golden","5:3"],
    delaySourceEngine: [1, 1],
    ratio: "Ratio",
    feedback: "Feedback",
    tone: "Tone",
    modesColor: [
        blue, green, red, yellow, lightBlue,
        blue, green, red, yellow,
        blue, green, red, yellow,
        blue, green, red,
        blue, green, red,
        blue, green, red,
        blue, green, red, yellow, lightBlue,
        blue, green,
        blue, green, red,
        blue, green,
        blue, green, red,
        blue, green, red
    ],
    modes: [
        0, 1, 2, 3, 4,
        8, 9, 10, 11,
        16, 17, 18, 19,
        24, 25, 26,
        32, 33, 34,
        40, 41, 42,
        48, 49, 50, 51, 52,
        56, 57,
        64, 65, 66,
        72, 73,
        80, 81, 82,
        88, 89, 90
    ],
    modesName: [
        "Pristine", "Short Stuff 1980", "Ping Pong", "Dynamic Duck", "Dynamic Feedback",
        "New Tape", "Old Tape", "Echoplex", "Space Echo",
        "BBD", "Tube BBD", "Deluxe Memory Boy", "Echorec ",
        "Digital Multi", "Tone Taps", "Preset Pattern Mode",
        "Panning Delay", "Trem Delay", "Waveform",
        "Filter Pulse", "Filter Warp", "Swoosh Echo",
        "Drunk Ewok", "Triggered Swell", "Triggered Multi Swell", "Long Delay", "Input Rider",
        "Hall", "Plate",
        "Reverse Delay", "Reverse Dual Pitch", "Triggered Reverse",
        "Chop Mode", "Auto Stutter",
        "Old Timer", "Digital Death", "Lofi Red Mode",
        "Knobs' Seesaw", "Christopher Glitchens", "Shimmery Fixed Pitch Shift"
    ],
    modeThing1: [
        "Mod Depth", "Mod Depth", "Mod Depth", "Duck Amount", "Duck Amount",
        "Mod Depth", "Mod Depth", "Saturation", "Input Drive",
        "Saturation", "Saturation", "Vibrato Amount", "combo of playback heads",
        "Intensities", "Tone Variations", "Delay Time Pattern",
        "Pan Width", "Trem Depth", "Waveform",
        "Pulse Center Frequency", "Filter Sensitivity", "Mod",
        "Delay Pattern", "Swell Time", "Swell Time", "Mod Depth", "Level Into Delay Line",
        "Mix of Delay to Reverb", "Mix of Delay to Reverb",
        "High Frequency Roll-Of", "Sets pitch of delay 1", "Swell Time ",
        "Chop Speed", "Filter sequence",
        "Oldness", "Aliasing Freq", "Drive Amount",
        "pitch when quiet", "delay 1 pitch", "Pitch shift"
    ],
    modeThing2: [
        "Mod Rate", "Bandwidth", "Mod Rate", "Release Speed", "Duck Threshold",
        "Mod Rate", "Mod Rate", "Mod Width", "Mod Width",
        "Mod", "Mod", "Chorus Amount", "combo of playback heads ",
        "Intensity Depth and pan width", "Intensity Depth and pan width", "Volume and Pan Variation",
        "Pan Speed", "Trem Speed", "Mod",
        "Pulse Speed", "Response Speed", "Swoosh Speed",
        "Diffusion", "Mod", "Flanger Amount", "Mode Rate", "All-pass Filter Amount",
        "Reverb Decay", "Reverb Decay",
        "Compression Amount", "Sets pitch of delay 2", "Chorus Level",
        "Mod", "Filter Aggressiveness",
        "Break-up amount", "Alias Blend", "compressor threshold",
        "pitch when louder", "delay 2 pitch", "Mod Amount"
    ]
};
var reverb = {
    name:"Reverb",
    modesColor: [
        blue, green,
        blue, green,
        blue, green, red,
        blue,
        blue, green,
        blue, green, red, yellow,
        blue, green,
        blue, green, red,
        blue, green, red,
        blue, green,
        blue, green,
        blue, green, red
    ],
    modes: [
        0, 1,
        8, 9,
        16, 17, 18,
        24,
        32, 33,
        40, 41, 42, 43,
        48, 49,
        56, 57, 58,
        64, 65, 66,
        72, 73,
        80, 81,
        88, 89, 90
    ],
    modesName: [
        "Concert Hall", "Modern Hall",
        "Classic Plate", "Studio Plate",
        "Bright Spring", "Dark Spring", "OverDrive Spring",
        "L.A. Studio",
        "Sparkle", "Glummer",
        "Modulated", "Chorused Reverb", "Flanged Reverb", "Tremolo Reverb",
        "Triggered Swell", "Gate Swell with Octave",
        "Single Tap Delay", "Blend-able Delay ", "Filtered Feedback Delay",
        "Reverse with Decay", "Reverse and Stop", "Reversed Delay",
        "Resonant", "Casper",
        "50's Radio", "Warble",
        "Glitch", "Gated Reverb", "Destroyer Pad"
    ],
    ratio: "decay",
    feedback: "low",
    tone: "high",
    modeThing1: [
        "Mod", "Pre Delay Time",
        "Pre Delay Time", "Pre Delay Time",
        "Rattle Decay", "Rattle Decay", "Rattle Decay and Level",
        "Pre-Delay Time",
        "Sparkle Level", "Octave down blend",
        "Mod Rate", "Mod Rate", "Mode Rate", "Tremolo Rate",
        "Swell Time", "Gate Attack",
        "Delay Time", "Blend of delay vs reverb", "Delay Time",
        "Reverse Swell Time", "Pre Delay", "Reverse Delay Length",
        "Mod Rate", "Mod",
        "Delay Level", "Warble",
        "Glitch Speed", "Gate Threshold", "Robot Screams"
    ],
    modeThing2: [
        "Early Reflection Level", "Early Reflection Level",
        "Bright Early Decay", "Early Reflection Level",
        "Rattle Level", "Rattle Level", "Break-up Amount",
        "Early Reflection Level",
        "Sparkle Length", "Octave Up Amount",
        "Mod Depth", "Mod Depth", "Mode Depth", "Tremolo Depth",
        "Mod", "Oct + vol",
        "Delay Feedback", "Delay Feedback", "Delay Feedback",
        "Reverse Mod", "Diffusion", "Amount of Reverb added to the reverse delay",
        "Resonance", "Diffusion",
        "Dirtiness", "Dirtiness",
        "Glitch Tone", "Gate Release", "Pitch shift"
    ]
};
var ccMessages = {
    both: {
        RecallPreset: 11,
        savePreset: 39,
        engage: 60,
    },
    reverb: {
        modes: 20,
        ratio: 21,
        mix: 22,
        volume: 23,
        feedback: 24,
        tone: 25,
        uno: 26,
        dos: 27,
    },
    echosystem: {
        modes: [100, 109],
        ratio: [101, 110],
        mix: [102, 111],
        volume: [103, 112],
        feedback: [104, 113],
        tone: [104, 114],
        uno: [106, 115],
        dos: [107, 116],
        delaySource: [108, 117],
        routingMode: 118,
        soloEngine: [41, 42],
        changeOrder: 40,
        tap: 35
    }


};
$('.2EngineBtns').hide();
function changePedal(p) {
    // console.log("here");

    if (p == 1) {
        pedal = echosystem.name.toLowerCase();
        $('#ddpedal').text("EchoSystem");
        $('#pedalName').text("EchoSystem");
        //show routing options dealy sourse and engine order
        $('#echoSystem1').show();
        $('#echoSystem2').show();
        $('#echoSystem3').show();
        //set mode knob to correct settings for echosystem
        $('.modeDial').trigger(
            'configure', {
                "max": 40,
            });
        //set ratio knob to correct settings for echosystem
        $(".ratioDial").trigger("configure", {
            'max': 9,
            'min': 1
        });
        $(".ratioDial").val(5).trigger('change');
        
        // set text for buttons
        $('.ratioLabel').text(echosystem.ratioNames[4]);
        $('.feedbackLabel').text(echosystem.feedback);
        $('.toneLabel').text(echosystem.tone);
        $('.saveLabel').text("Save");
        // $('#savePreset').show();


    } else if (p == 2) {
        // set text for buttons        
        pedal = reverb.name.toLowerCase();
        $(".ratioDial").trigger("configure", {
            'max': 127,
            'min': 0,
        });
        $('.modeDial').trigger(
            'configure', {
                "max": 29,
            });
        //set ratio knob to correct settings for reverb            
        $(".ratioDial").val(64).trigger('change');
        $('.dail').val(15).trigger('change');
        //hide routing options dealy sourse and engine order
        $('#echoSystem1').hide();
        $('#pedalName').text(reverb.name);
        $('#echoSystem2').hide();
        $('#echoSystem3').hide();
        $('#ddpedal').text(reverb.name);
        $('.ratioLabel').text(reverb.ratio);
        $('.feedbackLabel').text(reverb.feedback);
        $('.toneLabel').text(reverb.tone);
        // $('#savePreset').hide();

    }

}
/**
 * sends a midi Program change command
 * @param {*} channel of midi deive that you want to send to
 * @param {*} progam  change number
 */
function sendPC(channel, progam) {
    // console.log("sending pc message" + channel + " " + progam);

    var out = midi.outputs;
    out.forEach(function (port, key) {
        var output = midi.outputs.get(port.id);
        output.send([pc[channel - 1], program]);
    });

}
/**sends a midi control change message
 * 
 * @param {*} channel of midi device
 * @param {*} control # of command
 * @param {*} value  val of commad
 */
function sendCC(channel, control, value) {
    if(value <=127 ||value >=0){
    // console.log("sending  cc message" + channel + " " + control + " " + value);

    var out = midi.outputs;

    out.forEach(function (port, key) {
        var output = midi.outputs.get(port.id);
        output.send([cc[channel - 1], control, value]);
    });}

}



// if midi connection was successful 
function onMIDISuccess(midiAccess) {
    console.log("MIDI ready!");
    $('#success').show();
    alert("Midi connection worked");

    midi = midiAccess; // store in the global (in real usage, would probably keep in an object instance)
    // console.log(midi);

}
// if it failed
function onMIDIFailure(msg) {
    console.log("Failed to get MIDI access - " + msg);
    alert("Midi connection failed!!! Works best on Mac/pc with chrome");
}
// request midi access for browser
navigator.requestMIDIAccess({
    sysex: true
}).then(onMIDISuccess, onMIDIFailure);




/**
 * saves curret settings for either engine one or two
 * @param {*} eng 
 */
function savedails(eng) {
    if (eng == 1) {

        echosystem.dails1 = [parseInt($(".modeDial").val()), parseInt($(".ratioDial").val()), parseInt($(".mixDial").val()), parseInt($(".volDial").val()), parseInt($(".feedbackDial").val()), parseInt($(".toneDial").val()), parseInt($(".unoDial").val()), parseInt($(".dosDial").val())];
    } else {
        echosystem.dails2 = [parseInt($(".modeDial").val()), parseInt($(".ratioDial").val()), parseInt($(".mixDial").val()), parseInt($(".volDial").val()), parseInt($(".feedbackDial").val()), parseInt($(".toneDial").val()), parseInt($(".unoDial").val()), parseInt($(".dosDial").val())];
    }
}
/**
 * special save for the ratio when you change types 
 * @param {*} val 
 */
function saveRatio(val){
    if (engine == 1) {

        echosystem.dails1[1] = val;
    } else {
        echosystem.dails2[1] = val;
    }
}
/**
 * gets current val for better swithing
 */
function getRatio(){
    if( engine==1){
    return echosystem.dails1[1];
    }else if (engine==2){
        return echosystem.dails2[1];
    }
}


/**
 * saves all knobs on current engine the recalls the other engine 
 * @param {*} eng = what engine we want to change to 
 */
function changeDials(eng) {

    var names = [".modeDial", ".ratioDial", ".mixDial", ".volDial", ".feedbackDial", ".toneDial", ".unoDial", ".dosDial"]
    if (eng == 1) {
        engine = 1;
        for (let i = 0; i < 8; i++) {
            // console.log(echosystem.dails1[0])
            $(names[i]).val(echosystem.dails1[i]).trigger('change', {});
        }

        // console.log("engine 1");
    } else if (eng == 2) {
        engine = 2;

        for (let i = 0; i < 8; i++) {
            // console.log(echosystem.dails2[0])
            $(names[i]).val(echosystem.dails2[i]).trigger('change', {});
        }

        // console.log("engine 2");
    }
    if(echosystem.delaySourceEngine[engine - 1]==1 ||echosystem.delaySourceEngine[engine - 1]==2 )
    { 
        $('.ratioLabel').text(echosystem.ratioNames[getRatio()-1]);
     $(".ratioDial").trigger("configure", {
         'max': 9,
         'min': 1
     });
     if (echosystem.delaySourceEngine[engine - 1] == 3) {
         $(".ratioDial").val(getRatio()).trigger('change');
     }
    } else if (echosystem.delaySourceEngine[engine - 1] == 3) {
         // knob
         $('.ratioLabel').text('Delay Time');
         $(".ratioDial").trigger("configure", {
             'max': 127,
             'min': 0
         });
     }
}
/**
 *  cahnges preset and saves the current preset 
 * @param {*} newPreset newPreset number they wish to change to
 */
function changePreset(newPreset) {
    $('#dropdownLabel').text("preset " + newPreset);
    sendCC(midiChannel, ccMessages.both.RecallPreset, newPreset);
    preset = newPreset;
}

/**
 * channges the midi channel
 * @param {*} channel channel #
 */
function changeMidiChannel(channel) {
    $('#ddMidiChannel').text("midi channel " + channel);
    midiChannel = channel;
}
// ##########################################################################
// ##########################################################################
// #########################-----changing order-----#########################
// ##########################################################################
// ##########################################################################
/**
 * change the order on the engines 
 */
function changeOrder() {
    // console.log("switching order");
        $('#show').hide();

        if (engine == 1) {
        engine = 2
        savedails(1);
        switchEngine();
        changeDials(2);
        $('#Engine1').removeClass('active');
        $('#empressEngine-btn .btn').find('input:radio[name="empressEngine2"][value="2"]').prop("checked", true);
        $('#Engine2').addClass("focus").addClass("active");

    } else if (engine == 2) {
        savedails(2);
        switchEngine();
        changeDials(1);
        engine = 1;
        $('#Engine2').removeClass('active');
        $('#empressEngine-btn .btn').find('input:radio[name="empressEngine1"][value="1"]').prop("checked", true);
        $('#Engine1').addClass("focus").addClass("active");

    }
    sendCC(midiChannel, ccMessages.echosystem.changeOrder, 44);
    
}

/**
 *
 * switched dails for engines 
 *
 **/
function switchEngine() {
    // console.log("switching engine settings");
    var tempDelay = echosystem.delaySourceEngine[0];
    var temp = echosystem.dails2;
    //swtich the knobs
    echosystem.dails2 = echosystem.dails1;
    echosystem.dails1 = temp;

    //swtich the delaySourceEngine
    echosystem.delaySourceEngine[0] = echosystem.delaySourceEngine[1];
    echosystem.delaySourceEngine[1] = tempDelay;

}
/**
 * saves current changes to preset
 */
function savePreset() {
    // console.log($('#number-input').val());
    var num =$('#number-input').val();
    if(num >=36){
        alert("echosystem only has 35 presets so choose a number 1-35");
    }else{
    sendCC(midiChannel, ccMessages.both.savePreset,num );
    closeForm();
    alert("preset saved");}
}
// ##########################################################################
// ##########################################################################
// ##########################################################################
// ##########################################################################
// ##########################################################################

// ##########################################################################
// ##########################################################################
// #########################-----save menu-----##############################
// ##########################################################################
// ##########################################################################

function openForm() {
    document.getElementById("myForm").style.display = "block";
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
}

// ##########################################################################
// ##########################################################################
// ##########################################################################
// ##########################################################################


function soloEngine(engine) {
    var solo;
    sendCC(midiChannel, ccMessages.echosystem.soloEngine[0], 0);
    if (engine == 1) {
        if (flag1 == 0) {
            sendCC(midiChannel, ccMessages.echosystem.soloEngine[0], 44);
            flag1 = 1;
            flag2 = 0;
            $('#solo2').css('background-color', backgroundColor[darkLight]);

            $('#solo1').css('background-color', 'darkred');
        } else {
            flag1 = 0;
            sendCC(midiChannel, ccMessages.echosystem.soloEngine[0], 0);
            $('#solo1').css('background-color',  backgroundColor[darkLight]);
        }
    } else {
        solo = 42;
        if (flag2 == 0) {
            flag1 = 0;
            sendCC(midiChannel, ccMessages.echosystem.soloEngine[1], 44);
            $('#solo1').css('background-color',  backgroundColor[darkLight]);
            $('#solo2').css('background-color', 'darkred');
            flag2 = 1;
        } else {
            flag2 = 0;
            sendCC(midiChannel, ccMessages.echosystem.soloEngine[1], 0);
            $('#solo2').css('background-color',  backgroundColor[darkLight]);
        }
    }

}


function tap() {
    sendCC(midiChannel, ccMessages.echosystem.tap, 64);
}

function engage() {
    if (engaged == 1) {
        sendCC(midiChannel, ccMessages.both.engage, 0);
        engaged = 0;

    } else {
        sendCC(midiChannel, ccMessages.both.engage, 127);
        engaged = 1;

    }
}