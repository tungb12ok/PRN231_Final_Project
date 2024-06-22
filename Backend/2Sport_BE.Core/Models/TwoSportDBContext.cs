using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace _2Sport_BE.Repository.Models
{
    public partial class TwoSportDBContext : DbContext
    {
        public TwoSportDBContext()
        {
        }

        public TwoSportDBContext(DbContextOptions<TwoSportDBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Blog> Blogs { get; set; }
        public virtual DbSet<Brand> Brands { get; set; }
        public virtual DbSet<BrandCategory> BrandCategories { get; set; }
        public virtual DbSet<Cart> Carts { get; set; }
        public virtual DbSet<CartItem> CartItems { get; set; }
        public virtual DbSet<Category> Categories { get; set; }
        public virtual DbSet<ImagesVideo> ImagesVideos { get; set; }
        public virtual DbSet<ImportHistory> ImportHistories { get; set; }
        public virtual DbSet<Like> Likes { get; set; }
        public virtual DbSet<Order> Orders { get; set; }
        public virtual DbSet<OrderDetail> OrderDetails { get; set; }
        public virtual DbSet<PaymentMethod> PaymentMethods { get; set; }
        public virtual DbSet<Product> Products { get; set; }
        public virtual DbSet<Classification> Classifications { get; set; }
        public virtual DbSet<RefreshToken> RefreshTokens { get; set; }
        public virtual DbSet<Review> Reviews { get; set; }
        public virtual DbSet<Role> Roles { get; set; }
        public virtual DbSet<ShipmentDetail> ShipmentDetails { get; set; }
        public virtual DbSet<Sport> Sports { get; set; }
        public virtual DbSet<Supplier> Suppliers { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<Warehouse> Warehouses { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Blog>(entity =>
            {
                entity.HasIndex(e => e.Id, "UQ__Blogs__3214EC0693196DBE")
                    .IsUnique();

                entity.Property(e => e.BlogName).HasMaxLength(255);

                entity.Property(e => e.CreateAt).HasColumnType("datetime");

                entity.Property(e => e.MainImageName)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.MainImagePath).IsUnicode(false);

                entity.HasOne(d => d.Sport)
                    .WithMany(p => p.Blogs)
                    .HasForeignKey(d => d.SportId)
                    .HasConstraintName("FK__Blogs__SportId__5DCAEF64");
            });

            modelBuilder.Entity<Brand>(entity =>
            {
                entity.HasIndex(e => e.Id, "UQ__Brands__3214EC062B1DD238")
                    .IsUnique();

                entity.Property(e => e.BrandName).HasMaxLength(255);
            });

            modelBuilder.Entity<BrandCategory>(entity =>
            {
                entity.ToTable("BrandCategory");

                entity.HasIndex(e => e.Id, "UQ__BrandCat__3214EC06CDDC1719")
                    .IsUnique();

                entity.HasOne(d => d.Brand)
                    .WithMany(p => p.BrandCategories)
                    .HasForeignKey(d => d.BrandId)
                    .HasConstraintName("FK__BrandCate__Brand__44FF419A");

                entity.HasOne(d => d.Category)
                    .WithMany(p => p.BrandCategories)
                    .HasForeignKey(d => d.CategoryId)
                    .HasConstraintName("FK__BrandCate__Categ__440B1D61");
            });

            modelBuilder.Entity<Cart>(entity =>
            {
                entity.HasIndex(e => e.Id, "UQ__Carts__3214EC06AAD6E660")
                    .IsUnique();

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Carts)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK__Carts__UserId__797309D9");
            });

            modelBuilder.Entity<CartItem>(entity =>
            {
                entity.HasIndex(e => e.Id, "UQ__CartItem__3214EC06CFCFB618")
                    .IsUnique();

                entity.Property(e => e.TotalPrice).HasColumnType("decimal(18, 0)");

                entity.HasOne(d => d.Cart)
                    .WithMany(p => p.CartItems)
                    .HasForeignKey(d => d.CartId)
                    .HasConstraintName("FK__CartItems__CartI__7A672E12");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.CartItems)
                    .HasForeignKey(d => d.ProductId)
                    .HasConstraintName("FK__CartItems__Produ__02FC7413");
            });

            modelBuilder.Entity<Category>(entity =>
            {
                entity.HasIndex(e => e.Id, "UQ__Categori__3214EC06E5B3CC2C")
                    .IsUnique();

                entity.Property(e => e.CategoryName).HasMaxLength(255);
            });

            modelBuilder.Entity<ImagesVideo>(entity =>
            {
                entity.HasIndex(e => e.Id, "UQ__ImagesVi__3214EC06E3704065")
                    .IsUnique();

                entity.Property(e => e.ImageName).HasMaxLength(50);

                entity.Property(e => e.ImagePath).IsUnicode(false);

                entity.Property(e => e.VideoName).HasMaxLength(50);

                entity.Property(e => e.VideoPath).IsUnicode(false);

                entity.HasOne(d => d.Blog)
                    .WithMany(p => p.ImagesVideos)
                    .HasForeignKey(d => d.BlogId)
                    .HasConstraintName("FK__ImagesVid__BlogI__787EE5A0");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.ImagesVideos)
                    .HasForeignKey(d => d.ProductId)
                    .HasConstraintName("FK__ImagesVid__Produ__778AC167");
            });

            modelBuilder.Entity<ImportHistory>(entity =>
            {
                entity.HasIndex(e => e.Id, "UQ__ImportHi__3214EC0637C325A8")
                    .IsUnique();

                entity.Property(e => e.ImportCode).HasMaxLength(255);

                entity.Property(e => e.ImportDate).HasColumnType("datetime");

                entity.Property(e => e.LotCode).HasMaxLength(255);

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.ImportHistories)
                    .HasForeignKey(d => d.ProductId)
                    .HasConstraintName("FK__ImportHis__Produ__09A971A2");

                entity.HasOne(d => d.Supplier)
                    .WithMany(p => p.ImportHistories)
                    .HasForeignKey(d => d.SupplierId)
                    .HasConstraintName("FK__ImportHis__Suppl__0A9D95DB");
            });

            modelBuilder.Entity<Like>(entity =>
            {
                entity.HasIndex(e => e.Id, "UQ__Likes__3214EC069464DCC6")
                    .IsUnique();

                entity.HasOne(d => d.Blog)
                    .WithMany(p => p.Likes)
                    .HasForeignKey(d => d.BlogId)
                    .HasConstraintName("FK__Likes__BlogId__7F2BE32F");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.Likes)
                    .HasForeignKey(d => d.ProductId)
                    .HasConstraintName("FK__Likes__ProductId__7E37BEF6");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Likes)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK__Likes__UserId__00200768");
            });

            modelBuilder.Entity<Order>(entity =>
            {
                entity.HasIndex(e => e.Id, "UQ__Orders__3214EC06EFAAC59E")
                    .IsUnique();

                entity.Property(e => e.IntoMoney).HasColumnType("decimal(18, 0)");

                entity.Property(e => e.OrderCode).HasMaxLength(255);

                entity.Property(e => e.ReceivedDate).HasColumnType("datetime");

                entity.Property(e => e.TotalPrice).HasColumnType("decimal(18, 0)");

                entity.Property(e => e.TransportFee).HasColumnType("decimal(18, 0)");
                entity.Property(e => e.Status).HasColumnType("int");

                entity.HasOne(d => d.PaymentMethod)
                    .WithMany(p => p.Orders)
                    .HasForeignKey(d => d.PaymentMethodId)
                    .HasConstraintName("FK__Orders__PaymentM__04E4BC85");

                entity.HasOne(d => d.ShipmentDetail)
                    .WithMany(p => p.Orders)
                    .HasForeignKey(d => d.ShipmentDetailId)
                    .HasConstraintName("FK__Orders__Shipment__07C12930");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Orders)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK__Orders__UserId__05D8E0BE");
            });

            modelBuilder.Entity<OrderDetail>(entity =>
            {
                entity.HasIndex(e => e.Id, "UQ__OrderDet__3214EC06BDAD68F4")
                    .IsUnique();

                entity.HasOne(d => d.Order)
                    .WithMany(p => p.OrderDetails)
                    .HasForeignKey(d => d.OrderId)
                    .HasConstraintName("FK__OrderDeta__Order__0A9D95DB");
                entity.Property(e => e.Price).HasColumnType("decimal(18, 0)");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.OrderDetails)
                    .HasForeignKey(d => d.ProductId)
                    .HasConstraintName("FK__OrderDeta__Produ__07C12930");
            });

            modelBuilder.Entity<PaymentMethod>(entity =>
            {
                entity.ToTable("PaymentMethod");

                entity.HasIndex(e => e.Id, "UQ__PaymentM__3214EC06BC2A56D4")
                    .IsUnique();

                entity.Property(e => e.PaymentMethodName).HasMaxLength(255);
            });

            modelBuilder.Entity<Product>(entity =>
            {
                entity.HasIndex(e => e.Id, "UQ__Products__3214EC06DF65E655")
                    .IsUnique();

                entity.Property(e => e.Color)
                    .IsRequired()
                    .HasMaxLength(255);

                entity.Property(e => e.ListedPrice).HasColumnType("decimal(18, 0)");

                entity.Property(e => e.MainImageName).HasMaxLength(255);

                entity.Property(e => e.MainImagePath).IsUnicode(false);

                entity.Property(e => e.Offers).IsRequired();

                entity.Property(e => e.Price).HasColumnType("decimal(18, 0)");

                entity.Property(e => e.ProductCode).HasMaxLength(255);

                entity.Property(e => e.ProductName).HasMaxLength(255);

                entity.Property(e => e.Size)
                    .IsRequired()
                    .HasMaxLength(5)
                    .IsUnicode(false);

                entity.HasOne(d => d.Brand)
                    .WithMany(p => p.Products)
                    .HasForeignKey(d => d.BrandId)
                    .HasConstraintName("FK__Products__BrandI__7C4F7684");

                entity.HasOne(d => d.Category)
                    .WithMany(p => p.Products)
                    .HasForeignKey(d => d.CategoryId)
                    .HasConstraintName("FK__Products__Catego__7D439ABD");

                entity.HasOne(d => d.Sport)
                    .WithMany(p => p.Products)
                    .HasForeignKey(d => d.SportId)
                    .HasConstraintName("FK__Products__SportI__48CFD27E");
            });

            modelBuilder.Entity<RefreshToken>(entity =>
            {
                entity.ToTable("RefreshToken");

                entity.HasIndex(e => e.RefreshTokenId, "UQ__RefreshT__F5845E38FCABDF16")
                    .IsUnique();

                entity.Property(e => e.CreateDate).HasColumnType("datetime");

                entity.Property(e => e.ExpiryDate).HasColumnType("datetime");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.RefreshTokens)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK__RefreshTo__UserI__68487DD7");
            });

            modelBuilder.Entity<Review>(entity =>
            {
                entity.HasIndex(e => e.Id, "UQ__Reviews__3214EC0678B0813F")
                    .IsUnique();

                entity.Property(e => e.Review1)
                    .HasMaxLength(255)
                    .HasColumnName("Review");

                entity.Property(e => e.Star).HasColumnType("numeric(18, 0)");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.Reviews)
                    .HasForeignKey(d => d.ProductId)
                    .HasConstraintName("FK__Reviews__Product__01142BA1");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Reviews)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK__Reviews__UserId__02084FDA");
            });

            modelBuilder.Entity<Role>(entity =>
            {
                entity.HasIndex(e => e.Id, "UQ__Roles__3214EC063B39D64F")
                    .IsUnique();

                entity.Property(e => e.CreatedOn).HasColumnType("datetime");

                entity.Property(e => e.RoleName).HasMaxLength(255);

                entity.Property(e => e.UpdatedOn).HasColumnType("datetime");
            });

            modelBuilder.Entity<ShipmentDetail>(entity =>
            {
                entity.HasIndex(e => e.Id, "UQ__Shipment__3214EC06FD719AD4")
                    .IsUnique();

                entity.Property(e => e.Address).HasMaxLength(255);

                entity.Property(e => e.FullName).HasMaxLength(255);

                entity.Property(e => e.PhoneNumber).HasMaxLength(255);

                entity.HasOne(d => d.User)
                    .WithMany(p => p.ShipmentDetails)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK__ShipmentD__UserI__7B5B524B");
            });

            modelBuilder.Entity<Sport>(entity =>
            {
                entity.HasIndex(e => e.Id, "UQ__Sports__3214EC0620487C3B")
                    .IsUnique();
            });

            modelBuilder.Entity<Supplier>(entity =>
            {
                entity.HasIndex(e => e.Id, "UQ__Supplier__3214EC06299DBE49")
                    .IsUnique();

                entity.Property(e => e.Location).HasMaxLength(255);

                entity.Property(e => e.SupplierName).HasMaxLength(255);
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasIndex(e => e.Id, "UQ__Users__3214EC066582F2A1")
                    .IsUnique();

                entity.Property(e => e.BirthDate).HasColumnType("datetime");

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.Email).HasMaxLength(255);

                entity.Property(e => e.FullName).HasMaxLength(255);

                entity.Property(e => e.Gender).HasMaxLength(20);

                entity.Property(e => e.LastUpdate).HasColumnType("datetime");

                entity.Property(e => e.Password).HasMaxLength(255);

                entity.Property(e => e.Phone).HasMaxLength(20);

                entity.Property(e => e.Salary).HasMaxLength(20);

                entity.Property(e => e.UserName).HasMaxLength(255);
                entity.Property(e => e.Address).HasMaxLength(255);
                entity.HasOne(d => d.Role)
                    .WithMany(p => p.Users)
                    .HasForeignKey(d => d.RoleId)
                    .HasConstraintName("FK__Users__RoleId__6477ECF3");
            });

            modelBuilder.Entity<Warehouse>(entity =>
            {
                entity.HasIndex(e => e.Id, "UQ__Warehous__3214EC069561577D")
                    .IsUnique();

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.Warehouses)
                    .HasForeignKey(d => d.ProductId)
                    .HasConstraintName("FK__Warehouse__Produ__08B54D69");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
