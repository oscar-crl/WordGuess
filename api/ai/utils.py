import random

# alpha = ["a", "z", "e", "r", "t", "y", "u",
#          "i", "o", "p", "q", "s", "d", "f",
#          "g", "h", "j", "k", "l", "m", "w",
#          "x", "c", "v", "b", "n", "ENTER", "DEL"]
#
#
# def getAlpha(i):
#     return alpha[i]


def wordList(length):
    with open('words_alpha.txt') as f:
        word_list_raw = f.read().split()
    return [word for word in word_list_raw if len(word) == length]


def getRandomWord():
    return word_list[random.randint(0, len(word_list) - 1)]


def setActionSpace():
    return len(word_list) - 1


def getAction(index):
    return word_list[index]


print("getting words...")
word_list = wordList(5)
# word_list = ["tests", "pates", "ideal", "traps", "funny"]
