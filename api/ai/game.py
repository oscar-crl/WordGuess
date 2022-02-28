from ai.utils import getRandomWord, getAction


class Game:
    def __init__(self, word, word_len, tries_len):

        self.word_len = word_len
        self.word = word
        self.attempt = ""
        self.tries_len = tries_len
        self.tries = tries_len

    def writeWord(self, action):

        self.attempt = getAction(action)
        self.tries -= 1

        return self.confirmAttempt(), self.tries

    # def writeLetter(self, letter, render):
    #
    #     letter = getAlpha(letter)
    #
    #     if letter == "ENTER":
    #         if len(self.attempt) == 5 and findWord(self.attempt):
    #             self.tries -= 1
    #             if self.tries == 0:
    #                 end = True
    #             else:
    #                 end = False
    #             return self.confirmAttempt(), 100, end
    #         else:
    #             self.attempt = ""
    #             return None, 0, False
    #
    #     if letter == "DEL":
    #         self.attempt = self.attempt[:1]
    #         return None, 0, False
    #
    #     if len(self.attempt) < 5:
    #         self.attempt += letter
    #
    #     if render:
    #         print(self.attempt)
    #
    #     return None, 0, False

    def confirmAttempt(self):
        attemptObj = []
        for i in range(self.word_len):
            if self.attempt[i] == self.word[i]:
                attemptObj.append({"letter": self.attempt[i], "state": "valid"})
            elif self.attempt[i] in self.word:
                attemptObj.append({"letter": self.attempt[i], "state": "present"})
            else:
                attemptObj.append({"letter": self.attempt[i], "state": "absent"})
        self.attempt = ""

        return attemptObj

    def getEnd(self):
        if self.tries == 0:
            return True

        if self.attempt == self.word:
            return True

        return False

    def resetGame(self):
        self.word = getRandomWord()
        self.attempt = ""
        self.tries = self.tries_len

    def printInfo(self):
        print("word is: " + self.word)
