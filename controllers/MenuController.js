const inquirer = require('inquirer');

const ContactController = require('./ContactController');

module.exports = class MenuController
{
  constructor()
  {
    this.mainMenuQuestions = 
    [
      {
        type: 'list',
        name: 'mainMenuChoice',
        message: 'Please choose from an option below: ',
        choices:
        [
          'Add new contact',
          'View all contacts',
          'Search for a contact',
          'Show current date and time',
          'Exit'
        ]
      }
    ];
    
    this.book = new ContactController();
  }

  main()
  {
    console.log('Welcome to AddressBloc!');

    inquirer.prompt(this.mainMenuQuestions)
    .then((response) =>
    {
      switch (response.mainMenuChoice)
      {
        case 'Add new contact':
          this.addContact();
          break;
        case 'Show current date and time':
          this.getDate();
          break;
        case 'Search for a contact':
          this.search();
          break;
        case 'View all contacts':
          this.getContacts();
          break;
        case 'Exit':
          this.exit();
          break;
        default:
          console.log('Invalid input!');
          this.main();
      }
    }).catch((err) => 
    {
      console.log(err);
    });
  }

  clear()
  {
    console.log("\x1Bc");
  }

  addContact()
  {
    this.clear();
    
    inquirer.prompt(this.book.addContactQuestions)
    .then((answers) =>
    {
      this.book.addContact(answers.name, answers.phone, answers.email)
      .then((contact) =>
      {
        console.log('Contact added successfully!\n');
        this.main();
      })
      .catch((err) =>
      {
        console.log(err);
        this.main();
      });
    })
  }

  getDate()
  {
    this.clear();

    let date = new Date();

    console.log('Current date and time:');
    console.log(date.toLocaleString());
    console.log('');

    this.main();
  }
  
  getContacts()
  {
    this.clear();

    this.book.getContacts()
    .then((contacts) =>
    {
      for (let contact of contacts)
      {
        this._printContact(contact);
      }

      this.main();
    })
    .catch((err) =>
    {
      console.log(err);
      this.main();
    });
  }

  exit()
  {
    console.log('Thanks for using AddressBloc!');
    process.exit();
  }

  getContactCount()
  {
    return this.contacts.length;
  }

  remindMe()
  {
    return 'Learning is a life-long pursuit';
  }

  search()
  {
    this.clear();

    inquirer.prompt(this.book.searchQuestions)
    .then((target) =>
    {
      this.book.search(target.name)
      .then((contact) =>
      {
        if (contact === null)
        {
          console.log('Contact not found!\n');
          this.main();
        }
        else
        {
          this.showContact(contact);
        }
      })
      .catch((err) =>
      {
        console.log(err);
        this.main();
      });
    });
  }

  showContact(contact)
  {
    this._printContact(contact);

    inquirer.prompt(this.book.showContactQuestions)
    .then((answer) =>
    {
      switch (answer.selected)
      {
        case 'Delete contact':
          this.delete(contact);
          break;
        case 'Main menu':
          this.clear();
          this.main();
          break;
        default:
          console.log('Something went wrong!\n');
          this.showContact(contact);
      }
    })
    .catch((err) =>
    {
      console.log(err);
      this.showContact(contact);
    });
  }

  delete(contact)
  {
    inquirer.prompt(this.book.deleteConfirmQuestions)
    .then((answer) =>
    {
      if (answer.confirmation)
      {
        this.book.delete(contact.id);
        console.log('Contact deleted!\n');
        this.main();
      }
      else
      {
        console.log('Contact not deleted!\n');
        this.showContact(contact);
      }
    })
    .catch((err) =>
    {
      console.log(err);
      this.main();
    });
  }

  _printContact(contact)
  {
    console.log(
      `name: ${contact.name}\n` +
      `phone number: ${contact.phone}\n` +
      `email: ${contact.email}\n` +
      `------------------------------\n`
    );
  }
}