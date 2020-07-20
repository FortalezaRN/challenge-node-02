import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface TransactionDTO {
  value: number;
  title: string;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ type, value, title }: TransactionDTO): Transaction {
    if (!['income', 'outcome'].includes(type)) throw Error('Invalid Type');

    const { total } = this.transactionsRepository.getBalance();

    if (type === 'outcome' && total < value)
      throw Error('You not have Balance');

    const transaction = this.transactionsRepository.create({
      type,
      value,
      title,
    });

    return transaction;
  }
}

export default CreateTransactionService;
