import codecs
import jieba
import json
from jieba.analyse import extract_tags
from urllib.request import urlretrieve

url = "https://github.com/fxsjy/jieba/raw/master/extra_dict/dict.txt.big"
urlretrieve(url, "dict.txt.big")
jieba.load_userdict('word.txt')


with open('AllLaw.json', 'r',encoding="utf_8_sig") as data:
    lawData = json.load(data)
lawlist = lawData['Laws']


for law in lawlist:
    words = list(jieba.cut(law['LawName']))
    law['wordDB'] = words
    print(law['LawName'], law['wordDB'])


with open('AllLaw_worddb_f.json', 'w',encoding="utf_8_sig") as fp:
    json_string = json.dumps(lawData, ensure_ascii=False).encode('utf8').decode('utf8')
    fp.write(json_string) 






