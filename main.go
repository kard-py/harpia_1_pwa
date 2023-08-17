package main

import (
	"fmt"
	"log"
	"net/http"
	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
	    return true
	},
}

func ManipularWebsocket(w http.ResponseWriter, r *http.Request) {
	conexao, erro := upgrader.Upgrade(w, r, nil)
	if erro != nil {
		log.Println("Erro ao fazer upgrade do websocket:", erro)
		return
	}
	defer conexao.Close()

	for {
		erro := conexao.WriteMessage(websocket.TextMessage, []byte("Hello World"))
		if erro != nil {
			log.Println("Erro ao escrever WebSocket:", erro)
			return
		}
	}
}

func main() {
	http.HandleFunc("/hello", ManipularWebsocket)
	fmt.Println("WebSocket rodando na porta :3010")
	log.Fatal(http.ListenAndServe(":3010", nil))
}