import pprint
import requests

# ==== Fetch data ==== 

url = input("Paste the URL to the endpoint: ") ##
response = requests.get(url)
langtags = response.json()


# ==== Functions ==== 

# get language tag dictionary (if it exists)
def get_langtag_dict(data, input_tag):
	return next((tag for tag in data if tag["cApStAn"] == input_tag), None)

# corresponding tag in another convention 
def get_correspondent_tag(data, input_tag, source_convention, target_convention):
	return next((tag[target_convention] for tag in data if tag[source_convention] == input_tag), None)

# all tag dictionaries that have language subtag 'srb' (in cApStAn convention)
def get_tags_with_language_subtag(data, language_subtag):
	return [tag for tag in data if tag['cApStAn'].startswith(language_subtag + '-')]

# get all region subtags for a specific language subtag (in cApStAn convention)
def get_region_subtags_for_language(data, language_subtag):
	return [tag['cApStAn'].split('-')[1] for tag in data if tag['cApStAn'].startswith(language_subtag + '-')]


# ==== Calls ==== 

# get the whole list of cApStAn codes
capstan_codes = [tag['cApStAn'] for tag in langtags]

tag_dict = get_langtag_dict(langtags, 'val-ESP')
tag = get_correspondent_tag(langtags, 'glg-ESP', 'cApStAn', 'OmegaT')
tag_dicts = get_tags_with_language_subtag(langtags, 'srp')
region_subtags = get_region_subtags_for_language(langtags, 'srp')


# ==== Output ==== 

# print(capstan_codes)
# pprint.pprint(tag_dict)
# pprint.pprint(tag)
# pprint.pprint(tag_dicts)
pprint.pprint(f"Country tags language `srp` combines with: {region_subtags}")

print("\nShould you want to get some other output, please uncomment other lines in the Output section, or modify the code as you like.")
