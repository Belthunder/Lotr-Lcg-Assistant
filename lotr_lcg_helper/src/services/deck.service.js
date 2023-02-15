import http from "../http-common";

class DeckDataService {
    getAll() {
        return http.get("/decks");
    }

    get(id) {
        return http.get(`/decks/${id}`);
    }

    create(data) {
        return http.post("/decks", data);
    }

    update(id, data){
        return http.put(`/decks/${id}`, data);
    }

    delete(id) {
        return http.delete(`/decks/${id}`);
    }

    deleteAll() {
        return http.delete(`/decks`)
    }

    findByName(name) {
        return http.get(`/decks?name=${name}`);
    }
}

export default new DeckDataService();