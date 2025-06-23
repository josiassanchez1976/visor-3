# Visor-3

This repository contains a small script `store_filter.py` that filters a list of stores based on driving time using the Google Maps Distance Matrix API.

## Usage

1. Prepare a CSV or JSON file with store information. Each store should have either a `place_id`, a `url` containing a `query_place_id` parameter, or an `address` field.
2. Run the script and follow the interactive prompts:

```bash
python3 store_filter.py
```

You will be asked for:
- The path to the CSV/JSON file.
- Your Google Maps API key (kept only for the session).
- The origin postal code.
- The maximum number of driving hours allowed.

The script will query the Distance Matrix API for every store, filter those within the specified driving time and optionally save the result in JSON, CSV or text format.

The API key is not stored permanently.
