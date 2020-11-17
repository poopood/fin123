import Link from "next/link";

export const assetsOptions = [
    {
      value: [{cat: 'Assets'}, {type: 'Savings'}], label : 'Savings'
    },
    {
      value: [{cat: 'Assets'}, {type: 'Chequing'}], label : 'Chequing'
    },  
    {
      value: [{cat: 'Assets'}, {type: 'Wallet'}], label : 'Wallet'
    },
    {
      value: [{cat: 'Assets'}, {type: 'Receivables'}], label : 'Receivables'
    }
  ];


  export const liabilityOptions = [
    {
      value: [{cat: 'Liabilities'}, {type: 'Credit Card'}], label : 'Credit Card'
    },
    {
      value: [{cat: 'Liabilities'}, {type: 'Loans'}], label : 'Loans'
    },
    {
      value: [{cat: 'Liabilities'}, {type: 'Mortgages'}], label : 'Mortgages'
    },
    {
      value: [{cat: 'Liabilities'}, {type: 'Payables'}], label : 'Payables'
    }
  ];

  
export const groupedOptions = [
    {
      label: 'Assets',
      options: assetsOptions,
    },
    {
      label: 'Liabilities',
      options: liabilityOptions,
    },
    {'label':<Link href={`/add-account`}>
    <a>Add Account</a>
</Link>,isDisabled: true}
    
  ];