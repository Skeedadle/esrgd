// model
var ClusterModel = {
	"Discord": m.prop(),
	"Playlist": m.prop([
		"video/cluster1.webm",
		"video/cluster2.webm"
	]),
	"Handlers": {
		"ready": function() {
			document.getElementById("loader").className = "loader hidden";
		},
		"cycle": function() {
			ClusterModel.Playlist().push(ClusterModel.Playlist().shift());
		}
	},
	"Globals": {
		"background": function() {
			return m("div", { className: ClusterModel.Globals.BackgroundClass() }, [
				m("video", { src: ClusterModel.Playlist()[0], autoplay: true, onended: ClusterModel.Handlers.cycle, oncanplay: ClusterModel.Handlers.ready })
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
				m("a.btn", "Discord"),
				m("a.btn", "Forums")
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
				m("p", "Clustertruck (originally known as Highway Fight Squad) was created by Winyl. Your bones don't break, mine do. That's clear. Your cells react to bacteria and viruses differently than mine. You don't get sick, I do. That's also clear. But for some reason, you and I react the exact same way to water. We swallow it too fast, we choke. We get some in our lungs, we drown. However unreal it may seem, we are connected, you and I. We're on the same curve, just on opposite ends. Normally, both your asses would be dead as fucking fried chicken, but you happen to pull this shit while I'm in a transitional period so I don't wanna kill you, I wanna help you. But I can't give you this case, it don't belong to me. Besides, I've already been through too much shit this morning over this case to hand it over to your dumb ass.")
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