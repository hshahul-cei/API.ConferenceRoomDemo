(function ($) {

	$(document).ready(function() {


	    //Placeholder fix fir IE9 and below
		$.support.placeholder = ('placeholder' in document.createElement('input'));
		if (!$.support.placeholder) {
             $("[placeholder]").focus(function() {
                 if($(this).val() == $(this).attr("placeholder")) $(this).val("");
             }).blur(function() {
                 if($(this).val() == "") $(this).val($(this).attr("placeholder"));
             }).blur();
             $("[placeholder]").parents("form").submit(function() {
                 $(this).find('[placeholder]').each(function() {
                     if($(this).val() == $(this).attr("placeholder")) {
                         $(this).val("");
                     }
                 });
             });
             }

		    ////Jquery Fitext
        $(".hero-wrapper .caption-wrapper h1").fitText(1.4, { minFontSize: '32px', maxFontSize: '220px' });

	    //Overlay for mobile nav
        $("#main-content").prepend('<div class="api-overlay"></div>');

        $('.push-nav-off #main-nav ul > li.has-children').click(function(e) { //This is to handle bugs on android tablets where first click does not mimic hover interaction
        	if($(e.target).parent().hasClass('has-children')) {
				if(_isTablet()) {
	        		if(!$(this).hasClass('force-hover')) {
	        			$(this).addClass('force-hover');
	        			return false;
	        		}
	        	}
	        		}
	        		});

        if(supportTouch()) {
        	$('body').addClass('has-touch');
        	}


        $(".api-overlay").click(function() {
	    $("body").toggleClass('push-nav-on push-nav-off');
	    });

	    //Handle External Links (Open them in a new tab)
		$.expr[':'].external = function(obj) {
        	return !obj.href.match(/^mailto\:/)
                && (obj.hostname != location.hostname);
                };
    	$('a:external').attr('target', '_blank');

		$('.mob-nav-control').click(function() {
			$("body").toggleClass('push-nav-off push-nav-on');
			return false;
			});

		//Building Mobile nav
		$('<div id="mobile-drawer"> ' +$("#main-nav").html() + '</div>').insertBefore("#main-content");
		//Adding social channel links to mobile nav
		$("#mobile-drawer .navbar-nav").append('<li class="mob-social-channels visible-xs-block">' +$("#social-links .social-channels").html() +  '</li>');

		$("#main-nav-wrapper .search-trigger").click(function() {
			$(this).parent().toggleClass('search-off search-on');
			return false;
			});

			    //Expand nav with submenus (For mobile)
		$("body").on('click', '#mobile-drawer .has-children > a', function() {
			if(!$(this).parent().hasClass('open-menu')) {
				$(this).parent().addClass('open-menu');
				return false;
				}
				});

                if($("#contact-form-section").length > 0) {
                    if(window.location.hash &&(window.location.hash == '#success')) {
				$("#contact-form-section").fadeOut(100, function() {
					$('#contact-success').fadeIn(200);
					});
					}
					}

					    //Handle Show more/Show less
                        $('.show-more-toggle').click(function(e) {
			$(this).toggleClass('off on').text($(this).hasClass('on') ? 'Show Less': 'Show More');
			$(this).prev().toggleClass('off on');
			});


		//Populate Country List
		if($(".populate-country-full").length > 0) {
			$.each(countryList, function(k, value) {
                $(".populate-country-full").append($('<option>').text(value).attr('value', value));
            });
            }

		//Populate State List
		if($(".populate-states").length > 0) {
			$.each(stateList, function(k, value) {
                $(".populate-states").append($('<option>').text(value).attr('value', k));
	});
	}

	    //Needed for checkbox styling using fontAwesome
		$(':checkbox').change(function() {
			if($(this).prop('checked')) {
				$(this).parent('label').addClass('checked');
				} else {
				$(this).parent('label').removeClass('checked');
	}
	});


	    //Carousel Initialization (If more that 1 item present)
		if($(".carousel .carousel-inner .item").length > 1) {
			$(".carousel .carousel-indicators, .carousel .carousel-control").show();
			$('.carousel').carousel();
		}

		if($('.form-section').length > 0) {
	    //Customizing Select inputs
			$('form .form-group:odd').addClass('odd'); //nth child does not work properly when other elements are in the list
            // initial States/Provinces state - hide canada, show USA disabled    
            $("#fldstate").prop('disabled', 'disabled');
            $("#fldcanada").prop('disabled', 'disabled');
			$("#fldcanada-wrapper").hide();
            $('select').selectric({
			        maxHeight: 200,
	    disableOnMobile: false,
	    nativeOnMobile: false,
	        onChange: function(element) {
	        //Handle multiselect display, manually : looks like the plugin has a bug
            var selected = $(element).val();
            if(isEmpty(selected)) {
                $(this).parents('.form-group').removeClass('input-focus');
			      	} else {
			      		$(this).parents('.form-group').addClass('input-focus');
			      		}

			      	if(($("#registration-form").length > 0) && $("#registration-form").valid()) { //Because we need to enable the submit button if the form is valid
			      		$("#registration-form input[type='submit']").removeAttr('disabled');
			      		} else {
			      		$("#registration-form input[type='submit']").prop('disabled', 'disabled');
			      		}

			      		    //input-focus
			      	var m_attr = $(element).attr('multiple');
			      	if (typeof m_attr !== typeof undefined && m_attr !== false) {
						if(!isEmpty(selected)) {
							selected = selected.filter(function(v) {return v!==''});
							var txtlabel = (selected.length > 2) ? selected.slice(0, 2).join(', ') + ' ...': selected.join(', ');
							$(".selectric span.label", $(element).parents('.selectric-wrapper')).text(txtlabel);
							}
							}
							},
							});

							    //Close dropdown on mouseleave
                                $("body").on('mouseleave', '.selectric-scroll', function(e) {
                                    $('select').selectric('close');
                                    });

							        //Input Label hiding
                                $('.form-section .form-group > label').css("opacity", "1");
                                $('.form-section input[type="text"], .form-section textarea, .form-section select').filter(function () {
                                    return !!this.value; //Returns only element that have a value
                                }).parents('.form-group').addClass('input-focus');

			$(".form-section input[type='text'], .form-section textarea").focus(function() {
	        //$('.form-section .form-group').removeClass('input-focus');
        $(this).parent().addClass('input-focus');
        }).blur(function() {
        if(!isEmpty($(this).val())) {
            $(this).parent().addClass('input-focus');
        } else {
            $(this).parent().removeClass('input-focus');
	    }
        });
            // Onchange States/Provinces state - depends on country selection
			$('#fldcountry').selectric({
			    onChange: function (element) {
			       
			        if ($('#fldcountry').val() === "USA") {
			            $("#fldcanada-wrapper").hide();
			            $("#fldstate-wrapper").show();
                        $("#fldstate").removeAttr('disabled');
                        $("#fldstate").selectric('refresh');
                        $("#fldcanada").prop('disabled', 'disabled');
                            $("#fldcanada").selectric('refresh');
			        } else if ($('#fldcountry').val() === "Canada") {
			            $("#fldstate-wrapper").hide();
                        $("#fldcanada-wrapper").show();
			            $("#fldcanada").removeAttr('disabled');
			            $("#fldcanada").selectric('refresh');
			            $("#fldstate").prop('disabled', 'disabled');
                            $("#fldstate").selectric('refresh');
			        } else {
                        $("#fldcanada-wrapper").hide();
                        $("#fldstate-wrapper").show();
                        $("#fldstate").prop('disabled', 'disabled');
                        $("#fldcanada").prop('disabled', 'disabled');
                        $("#fldcanada").selectric('refresh');
                        $("#fldstate").selectric('refresh');

                    }

			    },
			});


    //Adding Custom validation functions
    $.validator.addMethod("notempty", function(value, element) {
        var key = value,
            tempValue = $.trim(value);

        if(tempValue == '') {
            return false;
            }
        return true;
    }, "please enter a value");

    $.validator.addMethod("nohtml", function(value, element) {
        if(/<\/?[a-z][\s\S]*>/i.test(value)) {
            return false;
        }
        return true;
        }, "No html allowed.");

            //Contact form validation
    $("form#contact-form").validate({
            errorElement: "span",
            rules: {
                    'firstname': {required: true, notempty: true, nohtml: true
            },
                    'lastname': {required: true, notempty: true, nohtml: true
            },
            'email': {
	        required: true, email: true
	        },
            'comment': {
                nohtml: true}
            },
                    messages : {
                        'firstname' : {
                required: "Please enter your first name.", notempty: "Please enter your first name.", nohtml: "No HTML allowed."
            },
            'lastname': {
	        required: "Please enter your last name.", notempty: "Please enter your last name.", nohtml: "No HTML allowed."},
                    'email': { required: "Please enter your email address.", email: "Please enter a valid email address."
	    },
                    'comment': {nohtml: "No HTML allowed."}
                },
                        submitHandler: function(form) {
                    //form.submit();
              		return true;
                }
                        });

            if($("#registration-form").length > 0) {
            	$('#txtfirstname, #txtlastname, #txtemail, #txtemail2, #fldAgree').change(function() {
            		if ($("#registration-form").valid()) {
            			$("#registration-form input[type='submit']").removeAttr('disabled');
                        } else {
            			$("#registration-form input[type='submit']").prop('disabled', 'disabled');
            			}
            			});

	            $("form#registration-form").validate({
            			        errorElement: "span",
            			    errorPlacement: function(error, element) {
                                error.appendTo(element.parents('.form-group'));
                                    //error.appendTo( element.parent("div").next("div") );
            			},
            			    rules: {
	                    'firstname': {required: true, notempty: true, nohtml: true},
                                'lastname': {
            			    required: true, notempty: true, nohtml: true},
                            'email': {
            			    required: true, email: true
            			},
	                    'email2': {
                        equalTo: "#txtemail"},
	                    'interest': {
                            required: true, notempty: true
                        },
	                    'company': {
                            nohtml: true
                        },
	                    'agree': {
	        required: true
	    }
	                },
	                    messages : {
	                    'firstname': {required: "Please enter your first name.", notempty: "Please enter your first name.", nohtml: "No HTML allowed." },
	                    'lastname': { required: "Please enter your last name.", notempty: "Please enter your last name.", nohtml: "No HTML allowed." },
	                    'email': {required: "Please enter your email address.", email: "Please enter a valid email address."
	                },
	                    'email2': {equalTo: "Email address must match."},
	                    'interest': {
	                        required: "Please select your interest.", notempty: "Please select your interest."
	                        },
                            'company': {
	                            nohtml: "No HTML allowed."
	                        },
                            'agree': {
	                            required: "Please agree to the terms and conditions."
	                            }
	                },
	                    submitHandler: function(form) {
                                createCookie('apiAuth', 'authenticated', 30); //Setup cookie for 30 days
                                return true;
	                }
	            });
	                }

	                                //Check if there is a hash for the login form
                                    if(window.location.hash && (window.location.hash == '#login')) {
	                                toggleHiddenForms();
	                                }

	                                //Registration Form validation
                    $("form#login-form").validate({
                        errorElement: "span",
	                                errorPlacement: function(error, element) {
                                        error.appendTo(element.parent());
	                                },
	                                    rules: {
                    'email': {
	                        required: true, email: true}
                },
                    messages: {
                    'email': {required: "Please enter your email address.", email: "Please enter a valid email address."
                    },
                    },
                    submitHandler: function(form) {
                        //form.submit();
                        createCookie('apiAuth', 'authenticated', 30); //Setup Cookie for 30 days
                        return true;
                    }
                });

                    $('.form-toggle').click(function() {
                        toggleHiddenForms();
                        return false;
            });

            }//End Form Section

                        //Rewrite main nav to footer
                if($("#footer .footer-nav ul").length == 0) {
                    $("#footer .footer-nav").prepend('<ul class="col1"></ul><ul class="col2"></ul><ul class="col3"></ul>');
                    $("#main-nav > ul > li:eq(0)").clone().appendTo("#footer .footer-nav ul.col1");
                    $("#main-nav > ul > li:gt(0)").clone().slice(0, 3).appendTo("#footer .footer-nav ul.col2");
                    $("#main-nav > ul > li:gt(3)").clone().appendTo("#footer .footer-nav ul.col3");
		}


		    //Update copyright Year
		$("#copyright-year").text(new Date().getFullYear());

                $("#footer ul li.has-children > a").click(function() {//Handles expanding footer nav items with submenus on mobile
                    if(isMobile() && !$(this).parent().hasClass('open-sub')) {
                    //Close others first
                    $("#footer ul li").removeClass('open-sub');
				$(this).parent().addClass('open-sub');
        return false;
	    }
	    });

	        //Done this way for reducing markup. trigger only on mobile
            $(".oil-category.section .tiles > li").click(function() {
			if(isMobile()) {
                    window.location = $('.caption > a', $(this)).attr('href');
	    }
	    });

	        //Show share screen modal on homepage
            $(".mob-home-share").click(function() {
                showModal($("#main-nav-wrapper .social-sharing").html(), 'popup-share');
		});

		$('body').on('click', '#modal-wrapper', function(e) {
                if($(e.target).hasClass('close-mod')) {
                    $("#modal-wrapper").empty();
	        	$(this).hide();
                    $("body").removeClass('noscroll');
		 	}
		 	});

		 	    //Oil Category Landing clicks (For this section the links are hidden)
                $(".section.oil-category-landing .tiles li").click(function() {
                    if(isMobile()) {
                    window.location = $(".caption > a", $(this)).attr('href');
                    }
                    });

                        /****
                        * Accordion FAQs
                        ******/
            if($('.accordion').length > 0) {
                var allPanels = $('.accordion > li > div');
                $('.accordion > li > a').click(function() {
                    var ref = this;
	        //allPanels.slideUp();

		    	if($(this).parent().hasClass('open')) {
		    		$(this).parent().removeClass('open');
		    		$("> div", $(this).parent()).slideUp();
	} else {
		    		$(this).parent().addClass('open');
	    $("> div", $(this).parent()).slideDown();
	    }

    if(isMobile()) {
        setTimeout(function() {
            $('html,body').animate({scrollTop: $(ref).parent().offset().top
	    }, 800);
	    }, 400);
	    }

    return false;
	    });
	    }


	        //Toolkit Form submission
$("#frm-oil-toolkit").submit(function() {
    if(isEmpty(readCookie('apiAuth'))) {
        alert("Please login first");
    setTimeout(function() {
        window.location = '/oil-toolkit/register.html';
    }, 400);

				return false;
	} else {
				return true;
				}
				});

	    /* Engine Toolkit Filter */
	    $("#main-content .toolkit-filter .tiles .icon").click(function () {
			$(this).toggleClass('off on');
			$("input[type='checkbox']", $(this)).prop("checked", !$("input[type='checkbox']", $(this)).prop("checked"));
			$("span.status", $(this)).text($("input[type='checkbox']", $(this)).prop("checked") ? 'Unselect': 'Select');
		});

		$("#main-content .toolkit-filter .tiles .description h3").click(function() {
			$(".icon", $(this).parents("li")).trigger('click');
	});

    $("#main-content .toolkit-filter .tiles .filter-item").click(function () {
        $(".icon", $(this).parents("li")).trigger('click');
        $(this).parents('form').submit();
        });

            //Documents filtering options
    if($('.toolkit-filter .filter-item').length > 0) {
			var currentValues = getUrlVariable('type');
			if(!isEmpty(currentValues)) {
				$('.toolkit-filter .filter-item').each(function (index, item) {
					if(currentValues.indexOf($(item).text()) >= 0) {
						$(".icon", $(this).parents('li')).toggleClass('off on');
						$(".icon input[type='checkbox']", $(this).parents('li')).prop("checked", true);
						}
						});
						}
						}


						    //Video List Rewrite
		if($('.video-list iframe').length > 0) {
			$('.video-list iframe').each(function(index, item) {
				vid = getYoutubeVideoID($(this).attr("src"));
				if(!isEmpty(vid)) {
					$(this).parents('li').prepend('<div class="img-wrapper" data-vid="' +vid + '" ><img src="http://img.youtube.com/vi/' +vid + '/0.jpg" alt="video" /></div>');
					}
					});


			$("body").on('click', '#main-content .page-content ul.video-list .img-wrapper', function() {
				var vidContent = '<div class="iframe-wrapper full"><iframe src="https://www.youtube.com/embed/' +$(this).data('vid') + '?&amp;showinfo=0&amp;autoplay=1&amp;rel=0&amp;modestbranding=1" frameborder="0" allowfullscreen></iframe></div>';
				showModal(vidContent, 'default video-player');
				});
				}

				});//End Document Ready

                $(window).load(function() {
  		equalizeHeight('.page-content .same-height');
				});

	$(window).resize(function() {
  		equalizeHeight('.page-content .same-height');
  		});


				    /***** UTILITY FUNCTIONS *****/

				    /** Checks if Device supports Touch Events **/
                    function supportTouch() {
                        try { document.createEvent("TouchEvent"); return true;
                        }
                        catch(e) {
                        return false;
				    }
				    }

	    /*******
        * Extract youtube 11 character Video ID from URL 
        *******/
	function getYoutubeVideoID(url) {
		var vid = '';
  		url = url.replace(/(>|<)/gi, '').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  		if(url[2]!== undefined) {
    		vid = url[2].split(/[^0-9a-z_\-]/i);
    		vid = vid[0];
    		} else {
    		vid = url;
    		}
    	return vid;
	}

	    /*******
        * Check if we are on a tablet
        *******/
	function _isTablet() {
	  	if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
 			return true;
	  	}
	    return false;
	  	}

	  	    /*******
            * Create cookie
            *******/
	function createCookie(name, value, days) {
	    if (days) {
	        var date = new Date();
	        date.setTime(date.getTime() +(days*24*60*60*1000));
	        var expires = "; expires="+date.toGMTString();
	        }
	        else var expires = "";
	    document.cookie = name+"="+value+expires+"; path=/";
	    }

	/*******
	* Read cookie. Takes cookie name as parameter
	*******/
	function readCookie(name) {
    	var nameEQ = name + "=";
    	var ca = document.cookie.split(';');
	    for(var i=0; i < ca.length; i++) {
	        var c = ca[i];
	        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
	        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
	        }
    	return null;
    	}

    	    /*******
            * Delete cookie
            *******/
	function deleteCookie(name) {
    	createCookie(name, "", -10);
    	}

	/*******
	* Get variable from Query String
	*******/
	function getUrlVariable(name) {
       	var vars = {
	};
		window.location.href.replace(location.hash, '').replace(/[?&]+([^=&]+)=?([^&]*)?/gi, function(m, key, value) {
			key = decodeURIComponent(key).replace('[]', '');
			value = decodeURIComponent(value).replace(/\+/g, ' ');
			if(!isEmpty(vars[key])) {

				if(value !== undefined) {
					if($.isArray(vars[key])) {
						vars[key].push(value);
			} else {
		    //Changing to an array
            var tmp = vars[key];
            vars[key]=[];
            vars[key].push(tmp);
						vars[key].push(value);
						}
						}
						} else {
				vars[key]= (value !== undefined) ? value : '';
						}
						});

		if (name) {
			return vars[name]? vars[name]: null;
						}
		return vars;
						}

                /*******
                * Show/hide form Sections
                *******/
	function toggleHiddenForms() {
		var targetFrmSection = $(".toggle-form-wrapper:hidden");
		var h2target = $(" > h2", $(targetFrmSection).parents('.form-section'));

    //Switching the header text if applicable
		var altText = $(h2target).data('alt-text');
    if(!isEmpty(altText)) {
			var temp = $(h2target).text();
			$(h2target).text(altText);
			$(h2target).data('alt-text', temp);
}

    	$(".toggle-form-wrapper").slideUp(400, function () {
    		$(targetFrmSection).slideDown();
    		});
    		}

    	    /*******
            * Check if a variable is empty
            *******/
	function isEmpty(mixed_var) {
    	mixed_var = jQuery.trim(mixed_var);
    	var key;
    	if (mixed_var === "" || mixed_var === 0 || mixed_var === "0" || mixed_var === null || mixed_var === false || typeof mixed_var === 'undefined') {
        	return true;
        	}

    	if(typeof mixed_var == 'object') {
        	for (key in mixed_var) {
            	return false;
    	}
        	return true;
    	}
    	return false;
}

    /*******
	* Check if mobile hamburger menu is visible (width <=767px)
	*******/
    function isMobile() {
		return $(".mob-nav-control").is(':visible');
		}

		    /*******
            * Show Modal
            *******/
	function showModal(content, classes) {
		if(classes == undefined)
			classes = 'default';

		var content = '<div class="modal-content ' +classes + '">' + content + '<span class="close-mod"></span></div>';
		$("#modal-wrapper").html(content);
		$("#modal-wrapper").show();
		$("body").addClass('noscroll');
		}


		    //Height Equilizer
            equalizeHeight = function(container) {

                var currentTallest = 0,
                    currentRowStart = 0,
                    rowDivs = new Array(),
     		$el,
     		topPosition = 0;

                $(container).each(function() {
		   $el = $(this);
		   $($el).height('auto')
		   topPostion = $el.position().top;

   			if (currentRowStart != topPostion) {
		    	for(currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
		       		rowDivs[currentDiv].height(currentTallest);
		     	}
     			rowDivs.length = 0; // empty the array
     			currentRowStart = topPostion;
     			currentTallest = $el.height();
     			rowDivs.push($el);
     			} else {
     			rowDivs.push($el);
     			currentTallest =(currentTallest < $el.height()) ? ($el.height()): (currentTallest);
  			}
   			for(currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) { 
     			rowDivs[currentDiv].height(currentTallest); 
   			}
   			});
   			}

   			    /*******
                * State List might be implemented Differently if stored in API DB
                *******/
	var stateList =	{
		'AL': 'Alabama',
		'AK': 'Alaska',
		'AZ': 'Arizona',
		'AR' : 'Arkansas',
		'CA' : 'California',
		'CO': 'Colorado',
		'CT': 'Connecticut',
		'DE': 'Delaware',
		'DC' : 'District of Columbia',
		'FL': 'Florida',
		'GA': 'Georgia',
		'HI': 'Hawaii',
		'ID': 'Idaho',
		'IL': 'Illinois',
		'IN': 'Indiana',
		'IA': 'Iowa',
		'KS': 'Kansas',
		'KY' : 'Kentucky',
		'LA': 'Louisiana',
		'ME': 'Maine',
		'MH' : 'Marshall Islands',
		'MD': 'Maryland',
		'MA': 'Massachusetts',
		'MI': 'Michigan',
		'MN': 'Minnesota',
		'MS': 'Mississippi',
		'MO': 'Missouri',
		'MT': 'Montana',
		'NE': 'Nebraska',
		'NV': 'Nevada',
		'NH': 'New Hampshire',
		'NJ': 'New Jersey',
		'NM': 'New Mexico',
		'NY': 'New York',
		'NC': 'North Carolina',
		'ND': 'North Dakota',
		'OH': 'Ohio',
		'OK': 'Oklahoma',
		'OR': 'Oregon',
		'PA': 'Pennsylvania',
		'PR': 'Puerto Rico',
		'RI': 'Rhode Island',
		'SC': 'South Carolina',
		'SD' : 'South Dakota',
		'TN' : 'Tennessee',
		'TX': 'Texas',
		    'UT' : 'Utah',
		'VT': 'Vermont',
		'VI' : 'Virgin Islands',
		'VA': 'Virginia',
		'WA' : 'Washington',
		'WV' : 'West Virginia',
		'WI' : 'Wisconsin',
		'WY' : 'Wyoming'
		};

		    /*******
            * Country List: might be implemented Differently if stored in API DB
            *******/
	var countryList = {
	  'AF': 'Afghanistan',
	  'AL': 'Albania',
	  'DZ': 'Algeria',
	  'AS': 'American Samoa',
	  'AD': 'Andorra',
	  'AO': 'Angola',
	  'AI': 'Anguilla',
	  'AQ': 'Antarctica',
	  'AG': 'Antigua and Barbuda',
	  'AR': 'Argentina',
	  'AM': 'Armenia',
	  'AW': 'Aruba',
	  'AU': 'Australia',
	  'AT': 'Austria',
	  'AZ': 'Azerbaijan',
	  'BH' : 'Bahrain',
	  'BD' : 'Bangladesh',
	  'BB' : 'Barbados',
	  'BY': 'Belarus',
	  'BE': 'Belgium',
	  'BZ' : 'Belize',
	  'BJ': 'Benin',
	  'BM': 'Bermuda',
	  'BT': 'Bhutan',
	  'BO': 'Bolivia',
	  'BA': 'Bosnia and Herzegovina',
	  'BW': 'Botswana',
	  'BV': 'Bouvet Island',
	  'BR': 'Brazil',
	  'IO': 'British Indian Ocean Territory',
	  'VG': 'British Virgin Islands',
	  'BN': 'Brunei',
	  'BG': 'Bulgaria',
	  'BF': 'Burkina Faso',
	  'BI': 'Burundi',
	  'CI': 'Côte d\'Ivoire',
	  'KH': 'Cambodia',
	  'CM': 'Cameroon',
	  'CA': 'Canada',
	  'CV': 'Cape Verde',
	  'KY': 'Cayman Islands',
	  'CF': 'Central African Republic',
	  'TD': 'Chad',
	  'CL': 'Chile',
	  'CN': 'China',
	  'CX': 'Christmas Island',
	  'CC': 'Cocos (Keeling) Islands',
	  'CO': 'Colombia',
	  'KM': 'Comoros',
	  'CG': 'Congo',
	  'CK' : 'Cook Islands',
	  'CR': 'Costa Rica',
	  'HR': 'Croatia',
	  'CU': 'Cuba',
	  'CY': 'Cyprus',
	  'CZ': 'Czech Republic',
	  'CD': 'Democratic Republic of the Congo',
	  'DK': 'Denmark',
	  'DJ': 'Djibouti',
	  'DM': 'Dominica',
	  'DO': 'Dominican Republic',
	  'TP': 'East Timor',
	  'EC': 'Ecuador',
	  'EG': 'Egypt',
	  'SV': 'El Salvador',
	  'GQ': 'Equatorial Guinea',
	  'ER': 'Eritrea',
	  'EE': 'Estonia',
	  'ET': 'Ethiopia',
	  'FO': 'Faeroe Islands',
	  'FK': 'Falkland Islands',
	  'FJ': 'Fiji',
	  'FI' : 'Finland',
	  'MK': 'Former Yugoslav Republic of Macedonia',
	  'FR': 'France',
	  'FX': 'France, Metropolitan',
	  'GF': 'French Guiana',
	  'PF': 'French Polynesia',
	  'TF': 'French Southern Territories',
	  'GA': 'Gabon',
	  'GE': 'Georgia',
	  'DE': 'Germany',
	  'GH': 'Ghana',
	  'GI': 'Gibraltar',
	  'GR': 'Greece',
	  'GL': 'Greenland',
	  'GD': 'Grenada',
	  'GP': 'Guadeloupe',
	  'GU': 'Guam',
	  'GT': 'Guatemala',
	  'GN': 'Guinea',
	  'GW': 'Guinea-Bissau',
	  'GY': 'Guyana',
	  'HT': 'Haiti',
	  'HM': 'Heard and Mc Donald Islands',
	  'HN': 'Honduras',
	  'HK': 'Hong Kong',
	  'HU': 'Hungary',
	  'IS': 'Iceland',
	  'IN': 'India',
	  'ID': 'Indonesia',
	  'IR': 'Iran',
	  'IQ': 'Iraq',
	  'IE': 'Ireland',
	  'IL': 'Israel',
	  'IT': 'Italy',
	  'JM': 'Jamaica',
	  'JP': 'Japan',
	  'JO': 'Jordan',
	  'KZ': 'Kazakhstan',
	  'KE': 'Kenya',
	  'KI': 'Kiribati',
	  'KW': 'Kuwait',
	  'KG': 'Kyrgyzstan',
	      'LA': 'Laos',
	  'LV': 'Latvia',
	  'LB': 'Lebanon',
	  'LS': 'Lesotho',
	  'LR': 'Liberia',
	  'LY': 'Libya',
	  'LI': 'Liechtenstein',
	  'LT': 'Lithuania',
	      'LU': 'Luxembourg',
	  'MO': 'Macau',
	  'MG': 'Madagascar',
	  'MW': 'Malawi',
	  'MY': 'Malaysia',
	  'MV': 'Maldives',
	  'ML': 'Mali',
	  'MT': 'Malta',
	  'MH': 'Marshall Islands',
	      'MQ': 'Martinique',
	  'MR': 'Mauritania',
	  'MU': 'Mauritius',
	  'YT': 'Mayotte',
	  'MX': 'Mexico',
	  'FM': 'Micronesia',
	  'MD': 'Moldova',
	  'MC': 'Monaco',
	  'MN': 'Mongolia',
	  'ME': 'Montenegro',
	  'MS' : 'Montserrat',
	  'MA': 'Morocco',
	  'MZ': 'Mozambique',
	  'MM': 'Myanmar',
	  'NA': 'Namibia',
	  'NR': 'Nauru',
	  'NP': 'Nepal',
	  'NL': 'Netherlands',
	  'AN': 'Netherlands Antilles',
	  'NC': 'New Caledonia',
	  'NZ': 'New Zealand',
	  'NI': 'Nicaragua',
	  'NE': 'Niger',
	  'NG': 'Nigeria',
	  'NU': 'Niue',
	  'NF': 'Norfolk Island',
	  'KP': 'North Korea',
	  'MP': 'Northern Marianas',
	  'NO': 'Norway',
	  'OM': 'Oman',
	  'PK': 'Pakistan',
	  'PW': 'Palau',
	  'PS': 'Palestine',
	  'PA': 'Panama',
	  'PG': 'Papua New Guinea',
	  'PY': 'Paraguay',
	  'PE': 'Peru',
	  'PH': 'Philippines',
	  'PN': 'Pitcairn Islands',
	  'PL': 'Poland',
	  'PT': 'Portugal',
	  'PR': 'Puerto Rico',
	  'QA': 'Qatar',
	  'RE': 'Reunion',
	  'RO': 'Romania',
	  'RU': 'Russia',
	  'RW': 'Rwanda',
	  'ST': 'São Tomé and Príncipe',
	  'SH': 'Saint Helena',
	  'PM': 'St. Pierre and Miquelon',
	  'KN': 'Saint Kitts and Nevis',
	  'LC': 'Saint Lucia',
	  'VC': 'Saint Vincent and the Grenadines',
	  'WS': 'Samoa',
	  'SM': 'San Marino',
	      'SA': 'Saudi Arabia',
          'SN': 'Senegal',
          'RS': 'Serbia',
          'SC': 'Seychelles',
	  'SL': 'Sierra Leone',
	  'SG': 'Singapore',
	  'SK': 'Slovakia',
	  'SI': 'Slovenia',
	  'SB': 'Solomon Islands',
	  'SO': 'Somalia',
	  'ZA': 'South Africa',
	  'GS': 'South Georgia and the South Sandwich Islands',
	  'KR': 'South Korea',
	  'ES': 'Spain',
	  'LK': 'Sri Lanka',
	  'SD': 'Sudan',
	  'SR': 'Suriname',
	  'SJ': 'Svalbard and Jan Mayen Islands',
	  'SZ': 'Swaziland',
	  'SE': 'Sweden',
	  'CH': 'Switzerland',
	      'SY': 'Syria',
	  'TW': 'Taiwan',
	  'TJ': 'Tajikistan',
	  'TZ': 'Tanzania',
	  'TH': 'Thailand',
	  'BS': 'The Bahamas',
	  'GM': 'The Gambia',
	  'TG': 'Togo',
	  'TK': 'Tokelau',
	  'TO': 'Tonga',
	  'TT': 'Trinidad and Tobago',
	  'TN': 'Tunisia',
	  'TR': 'Turkey',
	  'TM': 'Turkmenistan',
	  'TC': 'Turks and Caicos Islands',
	  'TV': 'Tuvalu',
	  'VI': 'US Virgin Islands',
	  'UG': 'Uganda',
	  'UA': 'Ukraine',
	  'AE': 'United Arab Emirates',
	  'GB': 'United Kingdom',
	  'US': 'United States',
	  'UM': 'United States Minor Outlying Islands',
	  'UY': 'Uruguay',
	  'UZ': 'Uzbekistan',
	  'VU': 'Vanuatu',
	  'VA': 'Vatican City',
	  'VE': 'Venezuela',
	  'VN': 'Vietnam',
	  'WF': 'Wallis and Futuna Islands',
	  'EH': 'Western Sahara',
	  'YE': 'Yemen',
	  'ZM': 'Zambia',
	  'ZW': 'Zimbabwe'
	  };

	  }) (jQuery);


