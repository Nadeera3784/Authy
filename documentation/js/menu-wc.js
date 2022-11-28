'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">authy documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AuthModule-dbeef59027847fe9a6ac737fa37fd595c96d9bfb9943f057818aa2527ab1fbc65932937d6a2ca8f45c92630ddbbeaeb4304e9e062ed06d4a19eda84792d51a7d"' : 'data-target="#xs-controllers-links-module-AuthModule-dbeef59027847fe9a6ac737fa37fd595c96d9bfb9943f057818aa2527ab1fbc65932937d6a2ca8f45c92630ddbbeaeb4304e9e062ed06d4a19eda84792d51a7d"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-dbeef59027847fe9a6ac737fa37fd595c96d9bfb9943f057818aa2527ab1fbc65932937d6a2ca8f45c92630ddbbeaeb4304e9e062ed06d4a19eda84792d51a7d"' :
                                            'id="xs-controllers-links-module-AuthModule-dbeef59027847fe9a6ac737fa37fd595c96d9bfb9943f057818aa2527ab1fbc65932937d6a2ca8f45c92630ddbbeaeb4304e9e062ed06d4a19eda84792d51a7d"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AuthModule-dbeef59027847fe9a6ac737fa37fd595c96d9bfb9943f057818aa2527ab1fbc65932937d6a2ca8f45c92630ddbbeaeb4304e9e062ed06d4a19eda84792d51a7d"' : 'data-target="#xs-injectables-links-module-AuthModule-dbeef59027847fe9a6ac737fa37fd595c96d9bfb9943f057818aa2527ab1fbc65932937d6a2ca8f45c92630ddbbeaeb4304e9e062ed06d4a19eda84792d51a7d"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-dbeef59027847fe9a6ac737fa37fd595c96d9bfb9943f057818aa2527ab1fbc65932937d6a2ca8f45c92630ddbbeaeb4304e9e062ed06d4a19eda84792d51a7d"' :
                                        'id="xs-injectables-links-module-AuthModule-dbeef59027847fe9a6ac737fa37fd595c96d9bfb9943f057818aa2527ab1fbc65932937d6a2ca8f45c92630ddbbeaeb4304e9e062ed06d4a19eda84792d51a7d"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/FacebookStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FacebookStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/GoogleStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GoogleStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/HashService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HashService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserCreatedListener.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserCreatedListener</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProductsModule.html" data-type="entity-link" >ProductsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-ProductsModule-5f00d14b92ad6fb08f0dd682a75bcb21df9382d58aea2d1360b9611c2ece5657e09a745107e5d6050f55509de326ff768d16fdbe1d4aefbbe062f01fe877d80d"' : 'data-target="#xs-controllers-links-module-ProductsModule-5f00d14b92ad6fb08f0dd682a75bcb21df9382d58aea2d1360b9611c2ece5657e09a745107e5d6050f55509de326ff768d16fdbe1d4aefbbe062f01fe877d80d"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ProductsModule-5f00d14b92ad6fb08f0dd682a75bcb21df9382d58aea2d1360b9611c2ece5657e09a745107e5d6050f55509de326ff768d16fdbe1d4aefbbe062f01fe877d80d"' :
                                            'id="xs-controllers-links-module-ProductsModule-5f00d14b92ad6fb08f0dd682a75bcb21df9382d58aea2d1360b9611c2ece5657e09a745107e5d6050f55509de326ff768d16fdbe1d4aefbbe062f01fe877d80d"' }>
                                            <li class="link">
                                                <a href="controllers/ProductsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ProductsModule-5f00d14b92ad6fb08f0dd682a75bcb21df9382d58aea2d1360b9611c2ece5657e09a745107e5d6050f55509de326ff768d16fdbe1d4aefbbe062f01fe877d80d"' : 'data-target="#xs-injectables-links-module-ProductsModule-5f00d14b92ad6fb08f0dd682a75bcb21df9382d58aea2d1360b9611c2ece5657e09a745107e5d6050f55509de326ff768d16fdbe1d4aefbbe062f01fe877d80d"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ProductsModule-5f00d14b92ad6fb08f0dd682a75bcb21df9382d58aea2d1360b9611c2ece5657e09a745107e5d6050f55509de326ff768d16fdbe1d4aefbbe062f01fe877d80d"' :
                                        'id="xs-injectables-links-module-ProductsModule-5f00d14b92ad6fb08f0dd682a75bcb21df9382d58aea2d1360b9611c2ece5657e09a745107e5d6050f55509de326ff768d16fdbe1d4aefbbe062f01fe877d80d"' }>
                                        <li class="link">
                                            <a href="injectables/CacheService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CacheService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ProductsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-UsersModule-1f03ae947855345ebad8fb37da1f02ee4a630bce639d161b583ca0fe99b2f7ed1d6589d97cf17c25841cef9cb34262f390d48c003b38a967b483ee7df02c3276"' : 'data-target="#xs-controllers-links-module-UsersModule-1f03ae947855345ebad8fb37da1f02ee4a630bce639d161b583ca0fe99b2f7ed1d6589d97cf17c25841cef9cb34262f390d48c003b38a967b483ee7df02c3276"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-1f03ae947855345ebad8fb37da1f02ee4a630bce639d161b583ca0fe99b2f7ed1d6589d97cf17c25841cef9cb34262f390d48c003b38a967b483ee7df02c3276"' :
                                            'id="xs-controllers-links-module-UsersModule-1f03ae947855345ebad8fb37da1f02ee4a630bce639d161b583ca0fe99b2f7ed1d6589d97cf17c25841cef9cb34262f390d48c003b38a967b483ee7df02c3276"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-UsersModule-1f03ae947855345ebad8fb37da1f02ee4a630bce639d161b583ca0fe99b2f7ed1d6589d97cf17c25841cef9cb34262f390d48c003b38a967b483ee7df02c3276"' : 'data-target="#xs-injectables-links-module-UsersModule-1f03ae947855345ebad8fb37da1f02ee4a630bce639d161b583ca0fe99b2f7ed1d6589d97cf17c25841cef9cb34262f390d48c003b38a967b483ee7df02c3276"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-1f03ae947855345ebad8fb37da1f02ee4a630bce639d161b583ca0fe99b2f7ed1d6589d97cf17c25841cef9cb34262f390d48c003b38a967b483ee7df02c3276"' :
                                        'id="xs-injectables-links-module-UsersModule-1f03ae947855345ebad8fb37da1f02ee4a630bce639d161b583ca0fe99b2f7ed1d6589d97cf17c25841cef9cb34262f390d48c003b38a967b483ee7df02c3276"' }>
                                        <li class="link">
                                            <a href="injectables/EmailFilter.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EmailFilter</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#controllers-links"' :
                                'data-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ProductsController.html" data-type="entity-link" >ProductsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UsersController.html" data-type="entity-link" >UsersController</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CreateProductsDto.html" data-type="entity-link" >CreateProductsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUsersDto.html" data-type="entity-link" >CreateUsersDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/EmailAvailabilityDto.html" data-type="entity-link" >EmailAvailabilityDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/IdParamValidation.html" data-type="entity-link" >IdParamValidation</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginDto.html" data-type="entity-link" >LoginDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/RegisterDto.html" data-type="entity-link" >RegisterDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateProductsDto.html" data-type="entity-link" >UpdateProductsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUsersDto.html" data-type="entity-link" >UpdateUsersDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserCreatedEvent.html" data-type="entity-link" >UserCreatedEvent</a>
                            </li>
                            <li class="link">
                                <a href="classes/WelcomeGreetingQueue.html" data-type="entity-link" >WelcomeGreetingQueue</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CacheService.html" data-type="entity-link" >CacheService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EmailFilter.html" data-type="entity-link" >EmailFilter</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FacebookGuard.html" data-type="entity-link" >FacebookGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FacebookStrategy.html" data-type="entity-link" >FacebookStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GoogleGuard.html" data-type="entity-link" >GoogleGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GoogleStrategy.html" data-type="entity-link" >GoogleStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HashService.html" data-type="entity-link" >HashService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtGuard.html" data-type="entity-link" >JwtGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtStrategy.html" data-type="entity-link" >JwtStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PrismaService.html" data-type="entity-link" >PrismaService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProductsService.html" data-type="entity-link" >ProductsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserCreatedListener.html" data-type="entity-link" >UserCreatedListener</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsersService.html" data-type="entity-link" >UsersService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/RoleGuard.html" data-type="entity-link" >RoleGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});