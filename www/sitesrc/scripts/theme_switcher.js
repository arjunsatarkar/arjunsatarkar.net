/*
This file is distributed under the terms of the MIT License, reproduced below.
---
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

addEventListener("DOMContentLoaded", () => {
	/*
	The following two SVG icons are from https://heroicons.com/.
	They are used under the terms of the MIT License, reproduced below.
	---
	MIT License

	Copyright (c) 2020 Refactoring UI Inc.

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
	const light_icon = `
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
</svg>
	`;
	const dark_icon = `
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
</svg>
	`;

	const icons = {
		"light": light_icon,
		"dark": dark_icon,
	};

	const body = document.querySelector("body");
	const switcher = document.createElement("div");
	switcher.setAttribute("id", "theme-switcher");
	switcher.setAttribute("style", "position: fixed; right: 0; bottom: 0; width:2em; height: 2em; cursor: pointer;");
	switcher.setAttribute("title", "switch theme");

	function update_theme(switcher_state, system_preference, change_source) {
		if (change_source === "switcher") {
			switcher_state = (switcher_state === "dark") ? "light" : "dark";
		}

		if (change_source === "system" && localStorage.getItem("theme") === "system") {

		} else if (change_source === "system" && localStorage.getItem("theme") !== "system") {
			localStorage.setItem("theme", "system");
		} else if (change_source === "switcher" && localStorage.getItem("theme") === "system") {
			localStorage.setItem("theme", switcher_state);
		} else if (change_source === "switcher" && localStorage.getItem("theme") !== "system") {
			localStorage.setItem("theme", "system");
		}

		switcher.setAttribute("data-state", (localStorage.getItem("theme") === "system") ? system_preference : switcher_state);
		switcher.innerHTML = icons[switcher.getAttribute("data-state")];
		body.setAttribute("data-theme", localStorage.getItem("theme"));
	}

	const system_preference_query = matchMedia("(prefers-color-scheme: dark)");
	function get_system_preference() {
		return system_preference_query.matches ? "dark" : "light";
	}

	if (!localStorage.getItem("theme")) {
		localStorage.setItem("theme", "system");
	}

	switcher.setAttribute("data-state", (localStorage.getItem("theme") !== "system") ? localStorage.getItem("theme") : get_system_preference());
	switcher.innerHTML = icons[switcher.getAttribute("data-state")];
	body.setAttribute("data-theme", localStorage.getItem("theme"));

	system_preference_query.addEventListener("change", (_) => {
		update_theme(switcher.getAttribute("data-state"), get_system_preference(), "system");
	});

	switcher.addEventListener("click", () => {
		update_theme(switcher.getAttribute("data-state"), get_system_preference(), "switcher");
	});

	body.append(switcher);
});
