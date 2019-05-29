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

var buttontype = null;
var buttontype2 = 1;

//empress Engine mode changer  empressEngine-btn
$(function () {


    $('#empressEngine-btn .btn').on('click', function (e) {
        $('#empressEngine-btn .btn').removeClass('focus');

        var val = $(this).find('input').val()

        if ($('#Global').hasClass('active')) {
            $('#Global').removeClass('active');
            $('#Global').removeClass('focus');
        } else if ($('#Local').hasClass('active')) {
            $('#Local').removeClass('active');
            $('#Local').removeClass('focus');
        } else if ($('#Knob').hasClass('active')) {
            $('#Knob').removeClass('active');
            $('#Knob').removeClass('focus');
        }
        if (val == '1') {


            if (echosystem.delaySourceEngine[0] == 1) {
                $('#delaySource-btn .btn').find('input:radio[name="delaySource"][value="2"]').prop("checked", true);
                $('#Global').addClass("focus").addClass("active");
                // $('#delaySource-btn').prop("checked", true);
            } else if (echosystem.delaySourceEngine[0] == 2) {
                $('#delaySource-btn .btn').find('input:radio[name="delaySource"][value="2"]').prop("checked", true);
                $('#Local').addClass("focus").addClass("active");
                // $('#delaySource2').prop("checked", true);
            } else if (echosystem.delaySourceEngine[0] == 3) {
                $('#delaySource-btn .btn').find('input:radio[name="delaySource"][value="2"]').prop("checked", true);
                $('#Knob').addClass("focus").addClass("active");
                // $('#delaySource3').prop("checked", true);
            }

            savedails(2);
            changeDials(1);
            engine = 1;
        } else if ((val == '2')) {
            if ($('.2EngineBtns').is(":hidden")) {
                
                $('.2EngineBtns').show();
            }

            //IF single is selected but we want 2 engines now
            //console.log("here  " + $('#empressEngine-btn').find('input:checked').val());

            if ($('#Single').hasClass('active')) {
                sendCC(midiChannel, ccMessages.echosystem.routingMode, 1);
                $('#Single').removeClass('active');
                $('#my-btns .btn').find('input:radio[name="empressRoute"][value="2"]').prop("checked", true);
                $('#Parallel').addClass("focus").addClass("active");
            }
            // $('#my-btns .btn').find('input:radio[name="empressRoute"][value="2"]').prop("checked", true);
            if (echosystem.delaySourceEngine[1] == 1) {

                $('#delaySource-btn .btn').find('input:radio[name="delaySource"][value="2"]').prop("checked", true);
                $('#Global').addClass("focus").addClass("active");
                // $('#delaySource-btn').prop("checked", true);
            } else if (echosystem.delaySourceEngine[1] == 2) {
                $('#delaySource-btn .btn').find('input:radio[name="delaySource"][value="2"]').prop("checked", true);
                $('#Local').addClass("focus").addClass("active");
                // $('#delaySource2').prop("checked", true);
            } else if (echosystem.delaySourceEngine[1] == 3) {
                $('#delaySource-btn .btn').find('input:radio[name="delaySource"][value="2"]').prop("checked", true);
                $('#Knob').addClass("focus").addClass("active");
                // $('#delaySource3').prop("checked", true);
            }
            savedails(1);
            changeDials(2);
            engine = 2;
        }
    });
});

// ##########################################################################
// ##########################################################################
// ##########################################################################
// ##########################################################################
// ##########################################################################

//empressRoute
$(function () {

    $('#my-btns .btn').on('click', function (event) {
        //console.log($(this).find('input').val());
        var val = $(this).find('input').val();

        //remove all focus tags
        $('#my-btns .btn').removeClass('focus');
        //check if buttons should be shown or hidden
        if (val == 1) {
            if($('.2EngineBtns').is(":visible")){
            $('.2EngineBtns').hide();
        }
        } else {
           if ($('.2EngineBtns').is(":hidden")) {
                $('.2EngineBtns').show();
            }
        }


        if (val == 1) {
            sendCC(midiChannel, ccMessages.echosystem.routingMode, 0);
            engine = 1;
            echosystem.routing = 1;

            //display the correct delay source

            // going from 2 engines back to one so display the correct values
            if ($('#Engine2').hasClass('active')) {
                if ($('#Global').hasClass('active')) {
                    $('#Global').removeClass('active');
                    $('#Global').removeClass('focus');

                } else if ($('#Local').hasClass('active')) {
                    $('#Local').removeClass('active');
                    $('#Local').removeClass('focus');

                } else if ($('#Knob').hasClass('active')) {
                    $('#Knob').removeClass('active');
                    $('#Knob').removeClass('focus');

                }
                $('#Engine2').removeClass('active');
                $('#Engine2').removeClass('focus');
                //display correct engine source
                $('#delaySource-btn .btn').find('input:radio[name="empressEngine1"][value="1"]').prop("checked", true);
                $('#Engine1').addClass("focus").addClass("active");
                if (echosystem.delaySourceEngine[0] == 1) {
                    $('#delaySource-btn .btn').find('input:radio[name="delaySource"][value="1"]').prop("checked", true);
                    $('#Global').addClass("focus").addClass("active");
                    // $('#delaySource-btn').prop("checked", true);
                } else if (echosystem.delaySourceEngine[0] == 2) {
                    $('#delaySource-btn .btn').find('input:radio[name="delaySource"][value="2"]').prop("checked", true);
                    $('#Local').addClass("focus").addClass("active");
                    // $('#delaySource2').prop("checked", true);
                } else if (echosystem.delaySourceEngine[0] == 3) {
                    $('#delaySource-btn .btn').find('input:radio[name="delaySource"][value="3"]').prop("checked", true);
                    $('#Knob').addClass("focus").addClass("active");
                    // $('#delaySource3').prop("checked", true);
                }
                changeDials(1);
            }

        } // sending just simply midi messages
        else if (val == 2) {
            echosystem.routing = 2;
            sendCC(midiChannel, ccMessages.echosystem.routingMode, 1);
        } else if (val == 3) {
            echosystem.routing = 3;

            sendCC(midiChannel, ccMessages.echosystem.routingMode, 2);
        } else if (val == 4) {
            echosystem.routing = 4;

            sendCC(midiChannel, ccMessages.echosystem.routingMode, 3);
        }
        buttontype = val;
    });
});



$(function (){
    $('#lightDark .btn').on('click', function (event) {
          console.log($(this).find('input').val());
          var val = $(this).find('input').val();

          if(val==2){
              console.log("here");
            $("body").css("background-color", "#1E1A1A");
            $("body").css("color", "white");
            $(".end").css("color", "white");
            document.body.style.setProperty("--btncolor","#3E3A3A");
            document.body.style.setProperty("--bodercolor","#5E5A5A");
            darkLight=1;

        

          }else if(val==1){
            console.log("here");
            $("body").css("background-color", "white");
            $("body").css("color", "lightgray");
            $(".end").css("color", "black");
            document.body.style.setProperty("--btncolor","#C0C0C0");
            document.body.style.setProperty("--bodercolor","lightgray");
            darkLight=0;


          }
    });
});
// ##########################################################################
// ##########################################################################
// ##########################################################################
// ##########################################################################
// ##########################################################################
// ##########################################################################
// ##########################################################################
// delaySource
$(function () {

    $('#delaySource-btn .btn').on('click', function (e) {
        // remove the class focus so the borders are good
        $('#delaySource-btn .btn').removeClass('focus');
        // get the val of the button  and the set val so
        var val = $(this).find('input').val()
        // console.log(val);

        if (val == '1') {
            //global
            $(".ratioDial").trigger("configure", {
                'max': 9,
                'min': 1
            });

            if (buttontype2 == 3) {
                // console.log(getRatio());

                if (getRatio() < 10) {
                    $('.ratioLabel').text(echosystem.ratioNames[getRatio() - 1]);
                    $(".ratioDial").val(getRatio()).trigger('change');
                } else {
                    $('.ratioLabel').text(echosystem.ratioNames[4]);
                    $(".ratioDial").val(5).trigger('change');
                }

            }
            sendCC(midiChannel, ccMessages.echosystem.delaySource[engine - 1], 0);
            echosystem.delaySourceEngine[engine - 1] = 1;

        } else if (val == '2') {
            //LOCAL 
            $(".ratioDial").trigger("configure", {
                'max': 9,
                'min': 1
            });
            if (buttontype2 == 3) {
                if (getRatio() < 10) {
                    $('.ratioLabel').text(echosystem.ratioNames[getRatio() - 1]);
                    $(".ratioDial").val(getRatio()).trigger('change');
                } else {
                    $('.ratioLabel').text(echosystem.ratioNames[4]);
                    $(".ratioDial").val(5).trigger('change');
                }

            }
            sendCC(midiChannel, ccMessages.echosystem.delaySource[engine - 1], 1);
            echosystem.delaySourceEngine[engine - 1] = 2;
        } else if (val == '3') {
            // knob
            $('.ratioLabel').text('Delay Time');
            $(".ratioDial").trigger("configure", {
                'max': 127,
                'min': 0
            });
            sendCC(midiChannel, ccMessages.echosystem.delaySource[engine - 1], 2);
            echosystem.delaySourceEngine[engine - 1] = 3;
        }
        // console.log($(this).val());
        buttontype2 = val;

    });
});