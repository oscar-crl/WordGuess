import time
import os

from stable_baselines3 import A2C, PPO, DQN

from ai.WordGuessEnv import WordGuessEnv
from ai.game import Game
from ai.utils import getRandomWord, getAction


def mainProcess(game):
    print("Enter mainProcess")

    env = WordGuessEnv(game)

    model = DQN('MlpPolicy', env, verbose=1)

    model.learn(total_timesteps=300000)

    modelPath = os.path.join('Training', 'Saved Models', 'DQN_wg_1')

    model.save(modelPath)

    # model.load(modelPath, env=env)

    for episode in range(1000):
        obs = env.reset()
        done = False
        score = 0
        print("-- ep " + str(episode) + " --")
        env.render('web')

        while not done:
            time.sleep(1 / 120)
            action, _ = model.predict(obs, deterministic=True)
            obs, reward, done, info = env.step(action)
            score += reward
            action = getAction(action)

            print(obs)
            print(action)
            print(score)
            print('')


word = getRandomWord()
game = Game(word, 5, 10)
mainProcess(game)
