const { body } = require('express-validator');

exports.registerValidation = [
  body('name')
    .notEmpty().withMessage('Name is required')
    .isLength({ max: 50 }).withMessage('Name cant be more than 50 chars'),
  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email'),
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be atleast 6 characters')
];

exports.loginValidation = [
  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email'),
  body('password')
    .notEmpty().withMessage('Password is required')
];

exports.taskValidation = [
  body('title')
    .notEmpty().withMessage('Title is required')
    .isLength({ max: 100 }).withMessage('Title cant be more than 100 chars'),
  body('description')
    .optional()
    .isLength({ max: 500 }).withMessage('Description cant be more than 500 chars'),
  body('status')
    .optional()
    .isIn(['todo', 'in-progress', 'done']).withMessage('Status must be todo, in-progress, or done'),
  body('priority')
    .optional()
    .isIn(['low', 'medium', 'high']).withMessage('Priority must be low, medium, or high')
];

exports.taskUpdateValidation = [
  body('title')
    .optional()
    .isLength({ max: 100 }).withMessage('Title cant be more than 100 chars'),
  body('description')
    .optional()
    .isLength({ max: 500 }).withMessage('Description cant be more than 500 chars'),
  body('status')
    .optional()
    .isIn(['todo', 'in-progress', 'done']).withMessage('Status must be todo, in-progress, or done'),
  body('priority')
    .optional()
    .isIn(['low', 'medium', 'high']).withMessage('Priority must be low, medium, or high')
];
