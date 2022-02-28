import numpy as np
from gym import Env
from gym.spaces import Discrete, Box

from ai.utils import setActionSpace


class WordGuessEnv(Env):

    def __init__(self, game):
        super(WordGuessEnv, self).__init__()

        self.game = game

        self.action_space = Discrete(setActionSpace())

        # state of each letter in attempt word
        self.observation_space = Box(-np.inf, np.inf, shape=(self.game.word_len,))

        # print(self.observation_space.sample())

        self.last_step = None

    def _get_observation(self, letterObject):

        lettersState = np.full(self.game.word_len, 2)

        reward = 0

        if letterObject is None:
            return np.array(lettersState), reward

        for i in range(len(letterObject)):
            if letterObject[i]["state"] == "valid":
                lettersState[i] = 0
                reward += 100
            if letterObject[i]["state"] == "present":
                lettersState[i] = 1
                reward += 50

        if letterObject == self.last_step:
            reward = -1000

        return lettersState, reward

    def step(self, action):

        step, tries = self.game.writeWord(action)

        obs, reward = self._get_observation(step)

        self.last_step = step

        end = self.game.getEnd()

        return obs, reward, end, {}

    def render(self, mode='cli'):
        self.game.printInfo()

    def reset(self):
        self.last_step = None
        self.game.resetGame()
        obs, _ = self._get_observation(None)
        return obs

    def close(self):
        exit(0)
