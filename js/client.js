// model
var ClusterModel = {
	"Discord": m.prop(),
	"Playlist": m.prop([
		"video/cluster1.webm",
		"video/cluster2.webm"
	]),
	"Handlers": {
		"cycle": function() {
			ClusterModel.Playlist().push(ClusterModel.Playlist().shift());
		}
	},
	"Globals": {
		"background": function() {
			return m("div", { className: ClusterModel.Globals.BackgroundClass() }, [
				m("video", { src: ClusterModel.Playlist()[0], autoplay: true, onended: ClusterModel.Handlers.cycle }),
				m("video.preload", { src: ClusterModel.Playlist()[1], autoplay: false })
			]);
		},
		"BackgroundClass": m.prop("bg"),
		"nav": function() {
			return m("div.nav", [
				m("a.btn", { href: "/", config: m.route }, "Home"),
				m("a.btn", { href: "/about", config: m.route }, "About"),
				m("a.btn", { href: "/buy", config: m.route }, "Buy"),
				m("a.btn", { href: "/news", config: m.route } ,"News"),
				m("a.btn", { target: "_blank", href: "https://reddit.com/r/HighwayFightSquad" }, "Reddit"),
				m("a.btn", { target: "_blank", href: "https://discord.gg/0mmEn8sRPpUikavZ" }, "Discord"),
				m("a.btn", { target: "_blank", href: "https://forum.playclustertruck.com" }, "Forums")
			]);
		}
	}
}

// component - main page
var ClusterPageMain = {
	"controller": function() {
		ClusterModel.Globals.BackgroundClass("bg");
	},
	"view": function(ctrl) {
		return m("div.content", [
			ClusterModel.Globals.background(),
			m("div.centre", [
				m("h1", "Clustertruck"),
				m("p", "A game about trucks"),
				ClusterModel.Globals.nav()
			])
		]);
	}
}

var ClusterPageAbout = {
	"controller": function() {
		ClusterModel.Globals.BackgroundClass("bg fade");
	},
	"view": function() {
		return m("div.content.alt", [
			ClusterModel.Globals.background("fade"),
			ClusterModel.Globals.nav(),
			m("div.box", [
				m("h2", "About Clustertruck"),
				m("br"),
				m("h3", "Description:"),
				m("br"),
				m("p", "The point of the game is to reach the end of each level without falling off trucks driven by terrible drivers. "),
				m("p", "Playing the campaign mode will take the player on a Hollywoodesque journey through many different worlds where everything tries to kill them."),
				m("p", "The game will also feature a fleshed out level editor and in-game steam workshop integration for sharing and browsing custom maps."),
				m("br"),
				m("h3", "Game features:"),
				m("br"),
				m("p", "100 unique levels"),
				m("br"),
				m("p", "10 different worlds"),
				m("br"),
				m("p", "An endless mode where you try to survive as long as possible"),
				m("p", "In-game level editor"),
				m("br"),
				m("p", "Steam workshop integration"),
				m("br"),
				m("p", "A powerful replay system"),
				
			])
		])
	}
}

var FourOhFour = {
	"view": function() {
		return m("div.errorpage", [
			m("div.centre", [
				m("h2", "404"),
				m("p", "Oops! Looks like you touched the ground."),
				m("a", { href: "/", config: m.route } ,"Try Again")
			])
		]);
	}
}

window.onload = function() {
	m.route.mode = "hash";
	m.route(document.getElementById("parent"), "/", {
		"/": ClusterPageMain,
		"/about": ClusterPageAbout,
		"/:other": FourOhFour
	});
}