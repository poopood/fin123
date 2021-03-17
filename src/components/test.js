<div className="dash-nav">
          <div className="nav-content">
            <div className="logo"></div>
            <div className="home_links">
              <ul>
              <Link href="/dashboard">
                <li className="active"><img  src="/images/house.svg" alt=""/></li>

                </Link>
                <Link href="/transactions">
                <li><img src="/images/slist.svg" alt=""/></li>
                </Link>
                
                
              </ul>
            </div>
            <div className="nav_links">
                  <ul>
                  
                  <li id="plus-icon">
                    
                    <img src="/images/plus.svg" alt=""
                    onClick={() => setAdd(!add)}
                    />
                    {add && <AddItem />}
                 
                  </li>
                    <li>
                    <Link href="/accounts">
                    <img src="/images/accounts.svg" alt=""/>
                  </Link>
                  </li>
                    <li>
                    <Link href={`/budget/${currentYear}/${currentMonth}`}>
                    <img src="/images/budget.svg" alt=""/>
                  </Link>
                  </li>
                    <li className="drop-caret"
                    >
                    <img src="/images/down-arrow.svg" alt=""
                      onClick={() => setDrop(!drop)}
                    />
                   {/* <a onClick={LogoutUser} >Logout</a> */}

                   { drop  && <DropItem />}
                 
                   
                  </li>
      
                  </ul>          
            </div>
            </div>
        </div>