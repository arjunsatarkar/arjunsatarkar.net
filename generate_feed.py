#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.13"
# dependencies = [
#     "beautifulsoup4>=4.15.0",
# ]
# ///
import datetime
import tomllib
import xml.etree.ElementTree as ET

from bs4 import BeautifulSoup

class Entry:
    def __init__(
        self,
        title: str,
        slug: str,
        published: datetime.datetime,
        updated: datetime.datetime | None,
    ):
        if published is None:
            raise ValueError("published datetime must be provided")
        if updated is None:
            updated = published
        self.title = title
        self.slug = slug
        self.published = published
        self.updated = updated
        with open(f"build/writing/{slug}/index.html") as f:
            soup = BeautifulSoup(f.read(), "html.parser")
        if soup.find("article"):
            self.content = str(soup.find("article"))
        else:
            self.content = soup.body.decode_contents(eventual_encoding="utf-8")


def get_entries():
    entries: list[Entry] = []
    latest_update_datetime = None
    with open("writing.toml", "rb") as f:
        toml = tomllib.load(f)
        for entry in toml["entry"]:
            new_entry = Entry(
                entry["title"],
                entry["slug"],
                entry["published"],
                entry.get("updated", None),
            )
            entries.append(new_entry)
            if (
                latest_update_datetime is None
                or new_entry.updated > latest_update_datetime
            ):
                latest_update_datetime = new_entry.updated
    return sorted(entries, key=lambda entry: entry.published), latest_update_datetime


def get_url_from_slug(slug: str):
    return f"https://arjunsatarkar.net/writing/{slug}/"


def generate_feed(entries: list[Entry], latest_updated_datetime: datetime.datetime):
    feed = ET.Element("feed")
    feed.attrib["xmlns"] = "http://www.w3.org/2005/Atom"

    title = ET.SubElement(feed, "title")
    title.text = "Writing | Arjun Satarkar"

    link_alternate = ET.SubElement(feed, "link")
    link_alternate.attrib["rel"] = "alternate"
    link_alternate.attrib["href"] = "https://arjunsatarkar.net/writing/"
    link_alternate.attrib["type"] = "text/html"

    link_self = ET.SubElement(feed, "link")
    link_self.attrib["rel"] = "self"
    link_self.attrib["href"] = "https://arjunsatarkar.net/writing.atom"
    link_self.attrib["type"] = "application/atom+xml"

    feed_id = ET.SubElement(feed, "id")
    feed_id.text = "tag:arjunsatarkar.net,2026:writing_feed"

    author = ET.SubElement(feed, "author")
    author_name = ET.SubElement(author, "name")
    author_name.text = "Arjun Satarkar"
    author_uri = ET.SubElement(author, "uri")
    author_uri.text = "https://arjunsatarkar.net/"
    author_email = ET.SubElement(author, "email")
    author_email.text = "me@arjunsatarkar.net"

    feed_updated = ET.SubElement(feed, "updated")
    feed_updated.text = latest_updated_datetime.isoformat(timespec="seconds")

    for entry in entries:
        feed_entry = ET.SubElement(feed, "entry")

        feed_entry_title = ET.SubElement(feed_entry, "title")
        feed_entry_title.text = BeautifulSoup(entry.title, "html.parser").get_text()

        feed_entry_link_alternate = ET.SubElement(feed_entry, "link")
        feed_entry_link_alternate.attrib["rel"] = "alternate"
        feed_entry_link_alternate.attrib["href"] = get_url_from_slug(entry.slug)

        feed_entry_id = ET.SubElement(feed_entry, "id")
        feed_entry_id.text = f"tag:arjunsatarkar.net,2026:writing_feed:{entry.slug}"

        feed_entry_published = ET.SubElement(feed_entry, "published")
        feed_entry_published.text = entry.published.isoformat(timespec="seconds")

        feed_entry_updated = ET.SubElement(feed_entry, "updated")
        feed_entry_updated.text = entry.updated.isoformat(timespec="seconds")

        feed_entry_content = ET.SubElement(feed_entry, "content")
        feed_entry_content.attrib["type"] = "html"
        feed_entry_content.text = entry.content

    return ET.tostring(feed, encoding="unicode", xml_declaration=True)


def main():
    entries, latest_updated_datetime = get_entries()
    with open("build/writing.atom", "w") as f:
        f.write(generate_feed(entries, latest_updated_datetime))


if __name__ == "__main__":
    main()
