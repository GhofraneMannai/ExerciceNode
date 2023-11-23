const Books = require("../models/book");
const Author = require("../models/auteur");
const validator = require('validator');

const fetchBooks = (req, res) => {
  //  console.log(req.params.duration)
  //  res.send(req.params.duration)
  Books.find()
    .populate("auteur")
    .populate("categories")
    .then((books) =>
      res.status(200).json({
        model: books,
        message: "success!",
      })
    )
    .catch(() => {
      res.status(400).json({
        error: Error.message,
        message: "probleme d'extraction des livres ! ",
      });
    });
};
// const addBook = (req, res) => {
//   const book = new Books(req.body);
//   book
//     .save()
//     .then(() => {
//       res.status(201).json({
//         models: book,
//         message: "book cree!",
//       });
//     })
//     .catch((error) => {
//       res.status(400).json({
//         error: error.message,
//         message: "Donnee invalides",
//       });
//     });
// };

const getBookByid = (req, res) => {
  Books.findOne({ _id: req.params.id })
    .populate("auteur")
    .populate("categories")
    .then((book) => {
      if (!book) {
        res.status(404).json({
          message: "livre non trouvé!",
        });
      } else {
        res.status(200).json({
          model: book,
          message: "livre trouvé!",
        });
      }
    })
    .catch(() => {
      res.status(400).json({
        error: Error.message,
        message: "Données invalides!",
      });
    });
};

const updateBook = (req, res) => {
  Books.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }).then(
    (book) => {
      if (!book) {
        res.status(404).json({
          message: "book non trouvé!",
        });
      } else {
        res.status(200).json({
          model: book,
          message: "book modifié!",
        });
      }
    }
  );
};

const deleteBook = (req, res) => {
  console.log(req.params.id);
  res.send("delete");
};

const deleteBookByid = (req, res) => {
  Books.deleteOne({ _id: req.params.id })
    .then((Book) =>
      res.status(200).json({
        message: "success!",
      })
    )
    .catch(() => {
      res.status(400).json({
        error: Error.message,
        message: "probleme d'extraction ",
      });
    });
};

const addBook=async (req, res) => {
  const book = new Books(req.body);
  book
    .save()
    .then(() => {
      res.status(201).json({
        models: book,
        message: "book cree!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error.message,
        message: "Donnee invalides",
      });
    });
};


const fetchBookByAuthor = async(req,res) => {
  const authorId = req.params.id;

  try {
    // Utilisez la méthode statique pour trouver tous les livres de l'auteur
    const booksByAuthor = await Books.findByAuthor(authorId);

    // Envoyez la réponse avec les livres trouvés
    res.json(booksByAuthor);
  } catch (error) {
    // Gérez les erreurs ici
    res.status(500).json({ error: 'Erreur lors de la recherche des livres de l\'auteur' });
  }
};


const AddValidatorBook = async(req,res) => {
  const { title, authorId } = req.body;

  try {
    // Validez le livre avec Mongoose (utilisez le schéma du livre avec des validateurs)
    const newBook = new Book({
      title: title,
      author: authorId
    });

    // Vérifiez si le livre est valide selon le schéma
    await newBook.validate();

    // Vérifiez si l'auteur a des anciens livres
    const author = await Author.findById(authorId).lean();;

    if (!author) {
      return res.status(400).json({ error: 'L\'auteur spécifié n\'existe pas.' });
    }

    const oldBooks = await Book.find({ author: authorId });

    if (oldBooks.length === 0) {
      return res.status(400).json({ error: 'L\'auteur doit avoir écrit d\'autres livres avant d\'ajouter un nouveau livre.' });
    }

    // Enregistrez le livre dans la base de données
    const savedBook = await newBook.save();

    res.json(savedBook);
  } catch (error) {
    if (error.name === 'ValidationError') {
      // Si le livre n'est pas valide, renvoyez une réponse avec les erreurs de validation
      res.status(400).json({ error: error.message });
    } else {
      // Gérez les autres erreurs ici
      res.status(500).json({ error: 'Erreur lors de la création du livre.' });
    }
  }
};








module.exports = {
  fetchBooks: fetchBooks,
  AddValidatorBook:AddValidatorBook,
  addBook: addBook,
  fetchBookByAuthor:fetchBookByAuthor,
  getBookByid: getBookByid,
  updateBook: updateBook,
  deleteBook: deleteBook,
  deleteBookByid: deleteBookByid,
};
