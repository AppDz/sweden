angular.module("sweeden", ["ngCordova","ionic","ionMdInput","ionic-material","ion-datetime-picker","ionic.rating","utf8-base64","angular-md5","chart.js","pascalprecht.translate","tmh.dynamicLocale","sweeden.controllers", "sweeden.services"])
	.run(function($ionicPlatform,$window,$interval,$timeout,$ionicHistory,$ionicPopup,$state,$rootScope){

		$rootScope.appName = "الهجرة إلى السويد" ;
		$rootScope.appLogo = "data/images/icon/SwedenLogo3.png" ;
		$rootScope.appVersion = "1.01" ;
		$rootScope.headerShrink = false ;

		$ionicPlatform.ready(function() {
			//required: cordova plugin add ionic-plugin-keyboard --save
			if(window.cordova && window.cordova.plugins.Keyboard) {
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
				cordova.plugins.Keyboard.disableScroll(true);
			}

			//required: cordova plugin add cordova-plugin-statusbar --save
			if(window.StatusBar) {
				StatusBar.styleDefault();
			}
			// this will create a banner on startup
			//required: cordova plugin add cordova-plugin-admobpro --save
			if (typeof AdMob !== "undefined"){
				var admobid = {};
				admobid = {
					banner: "ca-app-pub-9672344600152071/8579622788",
					interstitial: "ca-app-pub-9672344600152071/3038509736",
					rewardvideo: "ca-app-pub-9672344600152071/6129882633"
				};
				$timeout(function(){
					
					AdMob.createBanner({
						adId: admobid.banner,
						overlap: false,
						autoShow: true,
						offsetTopBar: false,
						position: AdMob.AD_POSITION.BOTTOM_CENTER,
						bgColor: "black"
					});
					
					AdMob.prepareInterstitial({
						adId: admobid.interstitial,
						autoShow: true,
					});
					
				}, 1000);
			
			
				$timeout(function(){
					AdMob.prepareRewardVideoAd({
						adId: admobid.rewardvideo,
						autoShow: true,
					});
				}, 30000);
			}


		});
		$ionicPlatform.registerBackButtonAction(function (e){
			if($ionicHistory.backView()){
				$ionicHistory.goBack();
			}else{
				$state.go("sweeden.dashboard");
			}
			e.preventDefault();
			return false;
		},101);
	})


	.filter("to_trusted", ["$sce", function($sce){
		return function(text) {
			return $sce.trustAsHtml(text);
		};
	}])

	.filter("trustUrl", function($sce) {
		return function(url) {
			return $sce.trustAsResourceUrl(url);
		};
	})

	.filter("trustJs", ["$sce", function($sce){
		return function(text) {
			return $sce.trustAsJs(text);
		};
	}])

	.filter("strExplode", function() {
		return function($string,$delimiter) {
			if(!$string.length ) return;
			var $_delimiter = $delimiter || "|";
			return $string.split($_delimiter);
		};
	})

	.filter("strDate", function(){
		return function (input) {
			return new Date(input);
		}
	})
	.filter("strHTML", ["$sce", function($sce){
		return function(text) {
			return $sce.trustAsHtml(text);
		};
	}])
	.filter("strEscape",function(){
		return window.encodeURIComponent;
	})
	.filter("strUnscape", ["$sce", function($sce) {
		var div = document.createElement("div");
		return function(text) {
			div.innerHTML = text;
			return $sce.trustAsHtml(div.textContent);
		};
	}])

	.filter("objLabel", function(){
		return function (obj) {
			var new_item = [];
			angular.forEach(obj, function(child) {
				new_item = [];
				var indeks = 0;
				angular.forEach(child, function(v,l) {
					if (indeks !== 0) {
					new_item.push(l);
				}
				indeks++;
				});
			});
			return new_item;
		}
	})
	.filter("objArray", function(){
		return function (obj) {
			var new_items = [];
			angular.forEach(obj, function(child) {
				var new_item = [];
				var indeks = 0;
				angular.forEach(child, function(v){
						if (indeks !== 0){
							new_item.push(v);
						}
						indeks++;
					});
					new_items.push(new_item);
				});
			return new_items;
		}
	})


.config(["$translateProvider", function ($translateProvider){
	$translateProvider.preferredLanguage("ar-dz");
	$translateProvider.useStaticFilesLoader({
		prefix: "translations/",
		suffix: ".json"
	});
}])


.config(function(tmhDynamicLocaleProvider){
	tmhDynamicLocaleProvider.localeLocationPattern("lib/ionic/js/i18n/angular-locale_{{locale}}.js");
	tmhDynamicLocaleProvider.defaultLocale("ar-dz");
})


.config(function($stateProvider, $urlRouterProvider,$sceDelegateProvider,$httpProvider,$ionicConfigProvider){
	try{
		// Domain Whitelist
		$sceDelegateProvider.resourceUrlWhitelist([
			"self",
			new RegExp('^(http[s]?):\/\/(w{3}.)?youtube\.com/.+$'),
			new RegExp('^(http[s]?):\/\/(w{3}.)?w3schools\.com/.+$'),
		]);
	}catch(err){
		console.log("%cerror: %cdomain whitelist","color:blue;font-size:16px;","color:red;font-size:16px;");
	}
	$stateProvider
	.state("sweeden",{
		url: "/sweeden",
			abstract: true,
			templateUrl: "templates/sweeden-side_menus.html",
			controller: "side_menusCtrl",
	})

	.state("sweeden._17", {
		url: "/_17",
		views: {
			"sweeden-side_menus" : {
						templateUrl:"templates/sweeden-_17.html",
						controller: "_17Ctrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("sweeden.about_us", {
		url: "/about_us",
		views: {
			"sweeden-side_menus" : {
						templateUrl:"templates/sweeden-about_us.html",
						controller: "about_usCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("sweeden.campus", {
		url: "/campus",
		cache:false,
		views: {
			"sweeden-side_menus" : {
						templateUrl:"templates/sweeden-campus.html",
						controller: "campusCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("sweeden.dashboard", {
		url: "/dashboard",
		cache:false,
		views: {
			"sweeden-side_menus" : {
						templateUrl:"templates/sweeden-dashboard.html",
						controller: "dashboardCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("sweeden.demandejob", {
		url: "/demandejob",
		cache:false,
		views: {
			"sweeden-side_menus" : {
						templateUrl:"templates/sweeden-demandejob.html",
						controller: "demandejobCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("sweeden.drive1step", {
		url: "/drive1step",
		cache:false,
		views: {
			"sweeden-side_menus" : {
						templateUrl:"templates/sweeden-drive1step.html",
						controller: "drive1stepCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("sweeden.driversweeden", {
		url: "/driversweeden",
		cache:false,
		views: {
			"sweeden-side_menus" : {
						templateUrl:"templates/sweeden-driversweeden.html",
						controller: "driversweedenCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("sweeden.driveschools", {
		url: "/driveschools",
		cache:false,
		views: {
			"sweeden-side_menus" : {
						templateUrl:"templates/sweeden-driveschools.html",
						controller: "driveschoolsCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("sweeden.edu1", {
		url: "/edu1",
		cache:false,
		views: {
			"sweeden-side_menus" : {
						templateUrl:"templates/sweeden-edu1.html",
						controller: "edu1Ctrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("sweeden.edusweeden", {
		url: "/edusweeden",
		cache:false,
		views: {
			"sweeden-edusweeden" : {
						templateUrl:"templates/sweeden-edusweeden.html",
						controller: "edusweedenCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("sweeden.faqs", {
		url: "/faqs",
		views: {
			"sweeden-side_menus" : {
						templateUrl:"templates/sweeden-faqs.html",
						controller: "faqsCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("sweeden.feesedu", {
		url: "/feesedu",
		cache:false,
		views: {
			"sweeden-side_menus" : {
						templateUrl:"templates/sweeden-feesedu.html",
						controller: "feeseduCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("sweeden.hosolwork", {
		url: "/hosolwork",
		cache:false,
		views: {
			"sweeden-side_menus" : {
						templateUrl:"templates/sweeden-hosolwork.html",
						controller: "hosolworkCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("sweeden.medical", {
		url: "/medical",
		cache:false,
		views: {
			"sweeden-side_menus" : {
						templateUrl:"templates/sweeden-medical.html",
						controller: "medicalCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("sweeden.menu_1", {
		url: "/menu_1",
		views: {
			"sweeden-side_menus" : {
						templateUrl:"templates/sweeden-menu_1.html",
						controller: "menu_1Ctrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("sweeden.menu_18", {
		url: "/menu_18",
		views: {
			"sweeden-side_menus" : {
						templateUrl:"templates/sweeden-menu_18.html",
						controller: "menu_18Ctrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("sweeden.menu_2", {
		url: "/menu_2",
		views: {
			"sweeden-side_menus" : {
						templateUrl:"templates/sweeden-menu_2.html",
						controller: "menu_2Ctrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("sweeden.menu_3", {
		url: "/menu_3",
		views: {
			"sweeden-side_menus" : {
						templateUrl:"templates/sweeden-menu_3.html",
						controller: "menu_3Ctrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("sweeden.menu_4", {
		url: "/menu_4",
		views: {
			"sweeden-side_menus" : {
						templateUrl:"templates/sweeden-menu_4.html",
						controller: "menu_4Ctrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("sweeden.mixed", {
		url: "/mixed",
		views: {
			"sweeden-side_menus" : {
						templateUrl:"templates/sweeden-mixed.html",
						controller: "mixedCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("sweeden.paperswork", {
		url: "/paperswork",
		cache:false,
		views: {
			"sweeden-side_menus" : {
						templateUrl:"templates/sweeden-paperswork.html",
						controller: "papersworkCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("sweeden.passportwork", {
		url: "/passportwork",
		cache:false,
		views: {
			"sweeden-side_menus" : {
						templateUrl:"templates/sweeden-passportwork.html",
						controller: "passportworkCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("sweeden.permitwork", {
		url: "/permitwork",
		cache:false,
		views: {
			"sweeden-side_menus" : {
						templateUrl:"templates/sweeden-permitwork.html",
						controller: "permitworkCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("sweeden.privatedrive", {
		url: "/privatedrive",
		cache:false,
		views: {
			"sweeden-side_menus" : {
						templateUrl:"templates/sweeden-privatedrive.html",
						controller: "privatedriveCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("sweeden.re", {
		url: "/re",
		views: {
			"sweeden-side_menus" : {
						templateUrl:"templates/sweeden-re.html",
						controller: "reCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("sweeden.refugesweeden", {
		url: "/refugesweeden",
		cache:false,
		views: {
			"sweeden-side_menus" : {
						templateUrl:"templates/sweeden-refugesweeden.html",
						controller: "refugesweedenCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("sweeden.residencesweeden", {
		url: "/residencesweeden",
		views: {
			"sweeden-side_menus" : {
						templateUrl:"templates/sweeden-residencesweeden.html",
						controller: "residencesweedenCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("sweeden.scholarprogram", {
		url: "/scholarprogram",
		cache:false,
		views: {
			"sweeden-side_menus" : {
						templateUrl:"templates/sweeden-scholarprogram.html",
						controller: "scholarprogramCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("sweeden.scholarships", {
		url: "/scholarships",
		cache:false,
		views: {
			"sweeden-side_menus" : {
						templateUrl:"templates/sweeden-scholarships.html",
						controller: "scholarshipsCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("sweeden.slide_tab_menu", {
		url: "/slide_tab_menu",
		views: {
			"sweeden-side_menus" : {
						templateUrl:"templates/sweeden-slide_tab_menu.html",
						controller: "slide_tab_menuCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("sweeden.ways2sweden", {
		url: "/ways2sweden",
		cache:false,
		views: {
			"sweeden-side_menus" : {
						templateUrl:"templates/sweeden-ways2sweden.html",
						controller: "ways2swedenCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("sweeden.whysweeden", {
		url: "/whysweeden",
		cache:false,
		views: {
			"sweeden-side_menus" : {
						templateUrl:"templates/sweeden-whysweeden.html",
						controller: "whysweedenCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("sweeden.worksweeden", {
		url: "/worksweeden",
		views: {
			"sweeden-side_menus" : {
						templateUrl:"templates/sweeden-worksweeden.html",
						controller: "worksweedenCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	$urlRouterProvider.otherwise("/sweeden/dashboard");
});
