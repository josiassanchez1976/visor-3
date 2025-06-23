import csv
import json
import sys
from urllib.parse import urlparse, parse_qs

import requests


def load_file(path):
    if path.lower().endswith('.json'):
        with open(path, 'r', encoding='utf-8') as f:
            return json.load(f)
    elif path.lower().endswith('.csv'):
        with open(path, newline='', encoding='utf-8') as f:
            return list(csv.DictReader(f))
    else:
        raise ValueError('Unsupported file type: %s' % path)


def extract_place_id(item):
    for key in ('place_id', 'placeId', 'placeID'):
        val = item.get(key)
        if val:
            return val
    url = item.get('url')
    if url:
        parsed = urlparse(url)
        qs = parse_qs(parsed.query)
        pid = qs.get('query_place_id')
        if pid:
            return pid[0]
    return None


def get_destination(item):
    pid = extract_place_id(item)
    if pid:
        return f'place_id:{pid}'
    for key in ('address', 'formatted_address'):
        val = item.get(key)
        if val:
            return val
    return None


def main():
    file_path = input('Path to JSON/CSV file with stores: ').strip()
    stores = load_file(file_path)

    api_key = input('Enter Google Maps API key: ').strip()
    origin = input('Enter origin postal code: ').strip()
    max_hours = float(input('Enter maximum driving hours: ').strip())

    url = 'https://maps.googleapis.com/maps/api/distancematrix/json'
    filtered = []

    for store in stores:
        dest = get_destination(store)
        if not dest:
            continue
        params = {
            'origins': origin,
            'destinations': dest,
            'mode': 'driving',
            'key': api_key,
        }
        try:
            resp = requests.get(url, params=params)
            data = resp.json()
            dur = data['rows'][0]['elements'][0].get('duration')
            if not dur:
                continue
            hours = dur['value'] / 3600
            store['_drive_hours'] = hours
            if hours <= max_hours:
                filtered.append(store)
        except Exception as e:
            print('Error processing', store.get('title') or store.get('name'), e, file=sys.stderr)

    print('Stores within', max_hours, 'hours:')
    for st in filtered:
        name = st.get('title') or st.get('name')
        print(f"- {name}: {st['_drive_hours']:.2f}h")

    save = input('Save results to file? (y/n): ').strip().lower()
    if save == 'y':
        out_path = input('Output file path (json/csv/txt): ').strip()
        if out_path.lower().endswith('.json'):
            with open(out_path, 'w', encoding='utf-8') as f:
                json.dump(filtered, f, indent=2)
        elif out_path.lower().endswith('.csv'):
            if filtered:
                with open(out_path, 'w', newline='', encoding='utf-8') as f:
                    writer = csv.DictWriter(f, fieldnames=filtered[0].keys())
                    writer.writeheader()
                    writer.writerows(filtered)
            else:
                open(out_path, 'w').close()
        else:
            with open(out_path, 'w', encoding='utf-8') as f:
                for st in filtered:
                    name = st.get('title') or st.get('name')
                    f.write(f"{name}\n")

    print('Done.')


if __name__ == '__main__':
    main()
