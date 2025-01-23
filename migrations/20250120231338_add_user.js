/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) 
{
  return await knex.raw(`
    CREATE OR REPLACE FUNCTION add_user(    
    _username varchar(100),
    _email varchar(100),
    _password varchar(100),
    _phonenumber varchar(100),
    _isadmin boolean
  ) returns void as $$ 
   begin

    if exists (select 1 from users where email = _email) then
     raise exception 'Email already exists'; 
    end if; 

    insert into users(username, email,password,phonenumber, isadmin)
    values (_username, _email,_password,_phonenumber, _isadmin);

  end;      
  $$ language plpgsql;`)

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
   return await knex.raw('drop function if exists add_user')

};
