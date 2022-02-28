from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import threading

from ai.game import Game
from ai.main import mainProcess
from ai.utils import getRandomWord

app = FastAPI()

origins = ["http://localhost:4200"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class LetterObject(BaseModel):
    letter: str
    valid: str


class WordObject(BaseModel):
    word: str


length = 5
word = getRandomWord()
game = Game(word, length, 6)
x = threading.Thread(target=mainProcess, args=(game,))
x.start()


@app.get("/init")
async def init():
    print("word is", word)
    x.start()
    return {"word": word}


@app.get("/requestAction")
async def requestAction():
    return {"letter": ""}
