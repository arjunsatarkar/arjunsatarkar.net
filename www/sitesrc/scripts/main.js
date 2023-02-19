/*
MIT License

Copyright (c) 2023-present Arjun Satarkar

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

document.addEventListener("DOMContentLoaded", (_) => {
	// SVGs from https://heroicons.com/, used  under the terms of the MIT license
	// See https://github.com/tailwindlabs/heroicons/blob/master/LICENSE
	const sun_icon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
	  <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
	</svg>`;
	const moon_icon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
	  <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
	</svg>`;

	const body = document.querySelector("body");
	const switcher = document.createElement("div");

	function set_switcher_state(state) {
		switcher.setAttribute("data-state", state);
		switcher.innerHTML = (state === "dark") ? moon_icon : sun_icon;
	}

	function toggle_switcher_state() {
		set_switcher_state((switcher.getAttribute("data-state") === "dark") ? "light" : "dark");
	}

	const system_theme_query = matchMedia("(prefers-color-scheme: dark)");
	let system_theme;
	system_theme_query.addEventListener("change", (event) => {
		system_theme = event.matches ? "dark" : "light";

		if (localStorage.getItem("theme") === system_theme) {
			localStorage.setItem("theme", "system");
			body.setAttribute("data-theme", "system");
		}

		if (switcher.getAttribute("data-state") !== system_theme) {
			toggle_switcher_state()
		}
	});
	system_theme = system_theme_query.matches ? "dark" : "light";

	if (localStorage.getItem("theme") === system_theme) {
		localStorage.setItem("theme", "system");
	}
	if (!localStorage.getItem("theme")) {
		localStorage.setItem("theme", "system");
	}
	body.setAttribute("data-theme", localStorage.getItem("theme"));

	switcher.setAttribute("id", "dark_light_switcher");
	switcher.setAttribute("title", "switch theme");
	switcher.setAttribute("style", "position: absolute; right: 0; top: 0;");
	switcher.setAttribute("data-state", (localStorage.getItem("theme") !== "system") ? localStorage.getItem("theme") : system_theme);
	switcher.innerHTML = (switcher.getAttribute("data-state") === "dark") ? moon_icon : sun_icon;
	switcher.addEventListener("click", (event) => {
		toggle_switcher_state()
		localStorage.setItem("theme", switcher.getAttribute("data-state"));
		if (localStorage.getItem("theme") === system_theme) {
			localStorage.setItem("theme", "system");
		}
		body.setAttribute("data-theme", localStorage.getItem("theme"));
	});

	body.appendChild(switcher);
});
