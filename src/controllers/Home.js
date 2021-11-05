class Home {
  // eslint-disable-next-line no-unused-vars
  async index(req, res) {
    await res.json('olaa');
  }
}

export default new Home();
