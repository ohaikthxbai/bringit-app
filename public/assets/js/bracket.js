            // jquery on when the window loads
            $(document).ready(function () {

                // create bracket button pressed, run function(s) below
                $('#render').on('click', function () {
                    $('#bracket-form').hide();
                    // user input: bracket size/number of entrants
                    var entrants = $('#bracket_size').val(); // Set the number of participants
                    console.log(entrants);
                    var tourneyName = $('#tName').val();
                    console.log(tourneyName);
                    $('#tName').append(tourneyName);

                    // not sure what this is
                    if (!String.prototype.format) {
                        String.prototype.format = function () {
                            var args = arguments;
                            return this.replace(/{(\d+)}/g, function (match, number) {
                                return typeof args[number] != 'undefined' ? args[number] : match;
                            });
                        };
                    }

                    // create an array from the user input
                    var participants = Array.from({ length: entrants }, (v, k) => k + 1);
                    var bracket = getBracket(participants);


                    //testing
                    console.log(bracket);
                    for (i = 0; i < bracket.length; i++) {
                        console.log(`TEST: ${i}`);
                        console.log(`array element test: ${bracket[i][0]}`);
                        console.log(`array element test: ${bracket[i][1]}`);
                    }


                    function getBracket(participants) {
                        // grab length of the participant array
                        var participantsCount = participants.length;
                        // determine number of rounds - log of participants / log of 2
                        var rounds = Math.ceil(Math.log(participantsCount) / Math.log(2));
                        // determine bracket size
                        var bracketSize = Math.pow(2, rounds);
                        // 
                        var requiredByes = bracketSize - participantsCount;

                        //testing
                        console.log("Number of participants: {0}".format(participantsCount));
                        console.log("Number of rounds: {0}".format(rounds));
                        console.log("Bracket size: {0}".format(bracketSize));
                        console.log("Required number of byes: {0}".format(requiredByes));

                        if (participantsCount < 2) {
                            return [];
                        }

                        var matches = [[1, 2]];
                        // set mataches for each round
                        for (var round = 1; round < rounds; round++) {
                            var roundMatches = [];
                            var sum = Math.pow(2, round + 1) + 1;

                            for (var i = 0; i < matches.length; i++) {
                                var home = changeIntoBye(matches[i][0], participantsCount);
                                var away = changeIntoBye(sum - matches[i][0], participantsCount);
                                roundMatches.push([home, away]);
                                home = changeIntoBye(sum - matches[i][1], participantsCount);
                                away = changeIntoBye(matches[i][1], participantsCount);
                                roundMatches.push([home, away]);
                            }
                            matches = roundMatches;

                        }

                        return matches;
                    }

                    function changeIntoBye(seed, participantsCount) {
                        //return seed <= participantsCount ?  seed : '{0} (= bye)'.format(seed);  
                        return seed <= participantsCount ? seed : null;
                    }

                    var bracketDiv = {
                        teams: bracket,
                        results: [
                            [
                                [[null, null], [null, null], [null, null], [null, null], [null, null], [null, null], [null, null], [null, null], [null, null], [null, null], [null, null], [null, null], [null, null], [null, null], [null, null], [null, null]],
                                [[null, null], [null, null], [null, null], [null, null], [null, null], [null, null], [null, null], [null, null]],
                                [[null, null], [null, null], [null, null], [null, null]],
                                [[null, null], [null, null]],
                                [[null, null]]
                            ]
                        ]
                    };

                    function saveFn(data, userData) {
                        var json = jQuery.toJSON(data)
                        $('#saveOutput').text('POST ' + userData + ' ' + json)
                        /* You probably want to do something like this
                        jQuery.ajax("rest/"+userData, {contentType: 'application/json',
                                                      dataType: 'json',
                                                      type: 'post',
                                                      data: json})
                        */
                    }

                    $(function () {
                        $('div#bracketDiv').bracket({
                            init: bracketDiv,
                            skipConsolationRound: true,
                            save: saveFn,
                            disableToolbar: true,
                            userData: "mongodb://localhost/bringit-bracket/bracket"
                        });

                        /* You can also inquiry the current data */
                        var data = container.bracket('data')
                        $('#dataOutput').text(jQuery.toJSON(data))
                    });
                });
            });